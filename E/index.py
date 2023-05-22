def find_lucky_numbers(total, num_digits):
    lucky_numbers = []
    for num in range(10**(num_digits-1), 10**num_digits):
        digits = list(map(int, str(num)))
        if len(digits) < num_digits:
            digits = [0]*(num_digits-len(digits)) + digits
        first_half = digits[:num_digits//2]
        second_half = digits[num_digits//2:]
        if total == sum(first_half) == sum(second_half) and len(set(first_half)) == len(first_half) and len(set(second_half)) == len(second_half):
            lucky_numbers.append(num)
    return lucky_numbers
# print(find_lucky_numbers(27, 6))
lucky_numbers = find_lucky_numbers(10, 3)
print(lucky_numbers)