using System;
using System.Collections.Generic;
using NetTopologySuite.Geometries;


namespace VrpBackend.Serialization
{
    public abstract class ModelData<T>
    {
        public abstract T ToModel();

        public static Coordinate CoordinateFactory(double[] coordinate)
        {
            if (coordinate.Length < 2)
                throw new ArgumentException("Not enough coordinates");
            return new Coordinate(coordinate[0], coordinate[1]);
        }

        public static Coordinate[] CoordinatesFactory(List<double[]> coordinates)
        {
            List<Coordinate> convertedCoordinates = new List<Coordinate>();
            foreach (double[] c in coordinates)
                convertedCoordinates.Add(CoordinateFactory(c));
            return convertedCoordinates.ToArray();
        }

        public static Point PointFactory(double[] point)
        {
            return new Point(CoordinateFactory(point));
        }

        public static Point[] PointsFactory(List<double[]> points)
        {
            List<Point> convertedPoints = new List<Point>();
            foreach (double[] p in points)
                convertedPoints.Add(PointFactory(p));
            return convertedPoints.ToArray();
        }

        public static MultiPoint MultiPointFactory(List<double[]> points)
        {
            return new MultiPoint(PointsFactory(points)); 
        }

        public static LineString LineStringFactory(List<double[]> coordinates)
        {
            return new LineString(CoordinatesFactory(coordinates));
        }        
        
        public static MultiLineString MultiLineStringFactory(List<List<double[]>> lineStrings)
        {
            List<LineString> convertedLlineStrings = new List<LineString>();
            foreach (List<double[]> l in lineStrings)
                convertedLlineStrings.Add(LineStringFactory(l));
            return new MultiLineString(convertedLlineStrings.ToArray());
        }

        public static double[] CoordinateSerialize(Coordinate coordinate)
        {
            return new double[]
            {
                coordinate.X,
                coordinate.Y
            };
        }

        public static double[] PointSerialize(Point point)
        {
            return CoordinateSerialize(point.Coordinate);
        }

        public static List<double[]> MultiPointSerialize(MultiPoint multiPoint)
        {
            List<double[]> serilizedPoints = new List<double[]>();
            foreach (Coordinate p in multiPoint.Coordinates)
                serilizedPoints.Add(CoordinateSerialize(p));
            return serilizedPoints;
        }

        public static List<double[]> LineStringSerialize(LineString lineString)
        {
            List<double[]> serilizedCoordinates = new List<double[]>();
            foreach (Coordinate c in lineString.Coordinates)
                serilizedCoordinates.Add(CoordinateSerialize(c));
            return serilizedCoordinates;
        }

        public static List<List<double[]>> MultiLineStringSerialize(MultiLineString multiLineString)
        {
            List<List<double[]>> serilizedLineStrings = new List<List<double[]>>();
            for (int i = 0; i < multiLineString.Count; ++i)
            {
                 LineString l = (LineString)multiLineString.GetGeometryN(i);
                serilizedLineStrings.Add(LineStringSerialize(l));
            }
            return serilizedLineStrings;
        }
    }
}
