# import json

# # Paths to the native and romanized files
# path_native = "assets/romanized/hi.romanized.rejoined.dev.native.txt"  # Adjust this path as needed
# path_romanized = "assets/romanized/hi.romanized.rejoined.dev.roman.txt"  # Adjust this path as needed

# # Initialize a list to hold sentence pairs
# sentence_pairs = []

# # Open both files simultaneously to pair sentences
# with open(path_native, "r", encoding="utf-8") as f_native, open(path_romanized, "r", encoding="utf-8") as f_romanized:
#     for native_line, romanized_line in zip(f_native, f_romanized):
#         # Clean up each line
#         native_sentence = native_line.strip()
#         romanized_sentence = romanized_line.strip()
        
#         # Store both versions in a dictionary
#         sentence_pairs.append({
#             "hindi": native_sentence,
#             "romanized": romanized_sentence
#         })

# # Save the list of sentence pairs to a JSON file
# output_path = "assets/hindi_sentences.json"
# with open(output_path, "w", encoding="utf-8") as f:
#     json.dump(sentence_pairs, f, ensure_ascii=False, indent=4)

# print("Sentence pairs successfully saved to 'hindi_sentences.json'")


# //- merging rejoined files too 

import json

# Define paths to all four files
files = [
    ("assets/romanized/hi.romanized.rejoined.dev.native.txt", "assets/romanized/hi.romanized.rejoined.dev.roman.txt"),
    ("assets/romanized/hi.romanized.rejoined.test.native.txt", "assets/romanized/hi.romanized.rejoined.test.roman.txt")
]

# Initialize a list to hold all sentence pairs
sentence_pairs = []

# Loop through each pair of files and read the data
for native_path, romanized_path in files:
    with open(native_path, "r", encoding="utf-8") as f_native, open(romanized_path, "r", encoding="utf-8") as f_romanized:
        for native_line, romanized_line in zip(f_native, f_romanized):
            # Clean up each line
            native_sentence = native_line.strip()
            romanized_sentence = romanized_line.strip()
            
            # Append the sentences as a dictionary
            sentence_pairs.append({
                "hindi": native_sentence,
                "romanized": romanized_sentence
            })

# Save the combined data to a JSON file
output_path = "assets/hindi_expanded_sentences.json"
with open(output_path, "w", encoding="utf-8") as f:
    json.dump(sentence_pairs, f, ensure_ascii=False, indent=4)

print("All sentence pairs saved to 'hindi_expanded_sentences.json'")
