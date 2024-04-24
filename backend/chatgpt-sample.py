import os
import dotenv
from openai import OpenAI

dotenv.load_dotenv()
client = OpenAI()

def send_message(message_body):
    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "Você é um vendedor de jogos digitais com vasto conhecimento em diversos tipos de jogos"},
            {"role": "user", "content": message_body}
        ]
    )
    return completion


if __name__=='__main__':
    user_message = input("Você: ").lower()
    print("ChatGPT: ", send_message(user_message))


