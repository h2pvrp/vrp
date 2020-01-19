import asyncio
import time
from aioworker import blocking_handler_wrapper, server

# "#ff8833"

def handler(request):
    print(request)
    time.sleep(10)
    return {
        "Distance": 0,
        "Routes": [
            [
                [52.25071547095678, 21.020327941763846],
                [52.25208165068237, 21.042831633279885],
                [52.24304306484044, 21.059838239845412],
            ],
            [
                [52.2346334247983, 21.05331045146673],
                [52.23831283839485, 21.06774029946174],
                [52.2592271359364, 21.051420828515017],
            ],
        ],
    }

if __name__ == "__main__":
    print("Start Dummy Worker 2")
    non_block = blocking_handler_wrapper(handler)
    server("localhost", 5006, non_block)

