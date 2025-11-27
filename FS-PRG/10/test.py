from tkinter import Tk
from tkinter.ttk import Label
import tkinter.font as tkFont

root = Tk()
root.title("Change font-size of Label")
root.geometry("400x250")

# Define a custom font
custom_font = tkFont.Font(family="Arial", size=25)

Label(root, text="I have default font-size").pack(pady=20)
Label(root, text="I have a font-size of 25", font=custom_font).pack()

root.mainloop()
