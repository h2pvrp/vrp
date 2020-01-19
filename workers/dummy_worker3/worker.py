import asyncio
import time
from aioworker import blocking_handler_wrapper, server

# "#ff3388"

def handler(request):
    print(request)
    time.sleep(15)
    return {
        "Distance": 0,
        "Routes": [
            [
                [52.20823783514339, 21.06791208336644],
                [52.202031016667405, 21.049187637753864],
            ],
            [
                [52.21139351204487, 21.05365401927613],
                [52.20150497525112, 21.064819973081782],
            ],
        ],
    }


if __name__ == "__main__":
    print("Start Dummy Worker 3")
    non_block = blocking_handler_wrapper(handler)
    server("localhost", 5007, non_block)

