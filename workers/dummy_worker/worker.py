import asyncio
import time
from aioworker import blocking_handler_wrapper, server


def handler(request):
    print(request)
    time.sleep(10)
    return {
        "Distance": 0,
        "Routes": [[
                [52.25019000601295, 20.993360043428115],
                [52.23852308138769, 20.96965659670597],
                [52.20855341292023, 20.972404822412894],
            ], [
                [52.25019000601295, 20.993360043428115],
                [52.23852308138769, 20.96965659670597],
                [52.20855341292023, 20.972404822412894],
            ],
        ]
    }


if __name__ == "__main__":
    print("Start Dummy Worker")
    non_block = blocking_handler_wrapper(handler)
    server("localhost", 5005, non_block)
