import asyncio
import time
from aioworker import blocking_handler_wrapper, server

# "#3388ff"

def handler(request):
    print(request)
    time.sleep(5)
    return {
        "Distance": 0,
        "Routes": [
            [
                [52.2175990227452, 21.042828106152534],
                [52.2296920181494, 21.011738802843063],
                [52.22432944398149, 20.964503673505515],
            ],
            [
                [52.21002607957454, 20.996108269135],
                [52.2059235296225, 21.016204669616805],
                [52.22254177532672, 21.043343398472587],
            ],
            [
                [52.25019000601295, 20.993360043428115],
                [52.23852308138769, 20.96965659670597],
                [52.20855341292023, 20.972404822412894],
            ],
        ],
    }


if __name__ == "__main__":
    print("Start Dummy Worker")
    non_block = blocking_handler_wrapper(handler)
    server("localhost", 5005, non_block)
