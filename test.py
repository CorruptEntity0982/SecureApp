import random

def main():
    while True:
        user_input = input("Press Enter to get a random answer or type 'end' to quit: ")
        if user_input.lower() == 'end':
            break
        print(random.choice(['Yes', 'No']))

if __name__ == "__main__":
    main()