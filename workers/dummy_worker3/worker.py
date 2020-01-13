import asyncio
import time
from aioworker import blocking_handler_wrapper, server


def handler(request):
    print(request)
    time.sleep(15)
    return {
        "Distance": 0
    }


if __name__ == "__main__":
    print("Start Dummy Worker 3")
    non_block = blocking_handler_wrapper(handler)
    server("localhost", 5007, non_block)
