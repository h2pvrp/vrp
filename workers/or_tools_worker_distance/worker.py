import asyncio
import aiohttp
from aioworker import load_settings, server, time_measurement_async
from ortools.constraint_solver import routing_enums_pb2
from ortools.constraint_solver import pywrapcp


COLOR = '3388ff'
MAX_VEHICLE_TRAVEL_DISTANCE = 100 * 1000
COST_COEFFICIENT = 100


def handler_factory(name, osmb_settings):
    async def handler_with_time(request):
        async def handler():
            osmb_host, osmb_port = osmb_settings['Host'], osmb_settings['Port']
            osmb_url = f'http://{osmb_host}:{osmb_port}'
            all_points, data = await create_data_model(request, osmb_url)
            manager = pywrapcp.RoutingIndexManager(len(data['distance_matrix']), data['num_vehicles'], data['depot'])
            routing = pywrapcp.RoutingModel(manager)
            
            distance_callback = distance_callback_factory(data, manager)
            transit_callback_index = routing.RegisterTransitCallback(distance_callback)
            routing.SetArcCostEvaluatorOfAllVehicles(transit_callback_index)
            
            dimension_name = 'Distance'
            routing.AddDimension(
                transit_callback_index,
                0,
                MAX_VEHICLE_TRAVEL_DISTANCE,
                True,
                dimension_name
            )
            distance_dimension = routing.GetDimensionOrDie(dimension_name)
            distance_dimension.SetGlobalSpanCostCoefficient(COST_COEFFICIENT)
            
            search_parameters = pywrapcp.DefaultRoutingSearchParameters()
            search_parameters.first_solution_strategy = (routing_enums_pb2.FirstSolutionStrategy.PATH_CHEAPEST_ARC)
            
            solution = routing.SolveWithParameters(search_parameters)
            routes = []
            distance = 0
            max_distance = 0
            max_duration = 0
            if solution:
                #print_solution(data, manager, routing, solution)
                point_routes = solution_to_points(all_points, data, manager, routing, solution)
                distance, max_distance, max_duration, routes = await solution_to_routes(point_routes, osmb_url)

            return {
                'Routes': routes,
                'Name': name,
                'ComputationTime': 0,
                'CombinedLength': distance,
                'LongestRouteLength': max_distance,
                'LongestRouteTime': max_duration,
                'NumberOfRoutes': len(routes),
                'Color': COLOR
            }

        computation, data = await time_measurement_async(handler)
        data['ComputationTime'] = computation
        print(data)
        return data

    return handler_with_time

async def create_data_model(request, osmb_url):
    all_points, distance_matrix = await get_distance_matrix(request["Base"], request["Points"], osmb_url)
    return all_points, {
        'distance_matrix': distance_matrix,
        'num_vehicles': request['VehicleCount'],
        'depot': 0
    }

async def get_distance_matrix(base, points, osmb_url):
    all_points = [base] + points
    points_params =';'.join(f'{longitude},{latitude}' for latitude, longitude, *_ in all_points)
    url = f'{osmb_url}/table/v1/driving/{points_params}?annotations=distance'
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as resp:
            data = await resp.json()
            return all_points, data['distances']

def distance_callback_factory(data, manager):
    def distance_callback(from_index, to_index):
        from_node = manager.IndexToNode(from_index)
        to_node = manager.IndexToNode(to_index)
        return data['distance_matrix'][from_node][to_node]
    
    return distance_callback

def solution_to_points(all_points, data, manager, routing, solution):
    all_routes = []
    for vehicle_id in range(data['num_vehicles']):
        index = routing.Start(vehicle_id)
        route = []
        while not routing.IsEnd(index):
            point_index = manager.IndexToNode(index)
            route.append(point_index)
            index = solution.Value(routing.NextVar(index))
        point_index = manager.IndexToNode(index)
        route.append(point_index)
        if (len(route) > 2):
            points_route = [all_points[i] for i in route]
            all_routes.append(points_route)
    return all_routes

def print_solution(data, manager, routing, solution):
    max_route_distance = 0
    for vehicle_id in range(data['num_vehicles']):
        index = routing.Start(vehicle_id)
        plan_output = 'Route for vehicle {}:\n'.format(vehicle_id)
        route_distance = 0
        while not routing.IsEnd(index):
            plan_output += ' {} -> '.format(manager.IndexToNode(index))
            previous_index = index
            index = solution.Value(routing.NextVar(index))
            route_distance += routing.GetArcCostForVehicle(
                previous_index, index, vehicle_id)
        plan_output += '{}\n'.format(manager.IndexToNode(index))
        plan_output += 'Distance of the route: {}m\n'.format(route_distance)
        print(plan_output)
        max_route_distance = max(route_distance, max_route_distance)
    print('Maximum of the route distances: {}m'.format(max_route_distance))

async def solution_to_routes(point_solution, osmb_url):
    async with aiohttp.ClientSession() as session:
        routes = []
        distance = 0
        max_distance = 0
        max_duration = 0
        for point_route in point_solution:
            points_params =';'.join(f'{longitude},{latitude}' for latitude, longitude, *_ in point_route)
            url = f'{osmb_url}/route/v1/driving/{points_params}?overview=full&geometries=geojson'
            async with session.get(url) as resp:
                try:
                    data = await resp.json()
                    route_obj = data['routes'][0]
                    routes_lon_lat = route_obj['geometry']['coordinates']
                    routes_lat_lon = [[latitude, longitude] for longitude, latitude, *_ in routes_lon_lat]
                    routes.append(routes_lat_lon)
                    route_distance, route_duration = route_obj['distance'], route_obj['duration']
                    distance += route_distance
                    max_distance = max(max_distance, route_distance)
                    max_duration = max(max_duration, route_duration)
                except (KeyError, IndexError) as e:
                    routes.append(point_route)
                    print(e)
        return distance, max_distance, max_duration, routes


if __name__ == '__main__':
    settings = load_settings()
    base_settings = settings['Base']
    host, port, name = base_settings['Host'], base_settings['Port'], base_settings['Name']
    print(f'{name} Worker')
    osmb_settings = settings['OSMB']
    handler = handler_factory(name, osmb_settings)
    server(host, port, handler)
