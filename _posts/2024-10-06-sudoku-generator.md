## Sudoku generator in Python

### Basic idea
I want to write a program that can generate sudoko puzzles for me. While there are ready made packages out there, I want to solve this problem on my own and build something from scratch. My idea is to first build a 100% solved Sudoku and then randomly hide some cells to create the final puzzle.

Most Sudokus consists of a 9x9 matrix which in turn is composed of 9 smaller matrices of dimensions 3X3. The main criteria for a valid Sudoku is - 

1. All rows & columns must consists of a unique sequence of numbers 1 to 9
2. Each of the 9 sub-matrices should also consists of a unique set of numbers from 1 to 9

### Intuition
Total sum of all digits in a row, column and each of the 3X3 submatrices must exactly equal 45 because sum of first 9 natural numbers is 45. Since we have 9 such matrices in a valid Sudoko, sum of all numbers in Sudoku should be exactly equal to 9 x 45 = 405. This are the necessary conditions for a valid Sudoku.

I am wondering if I write a program that satisfies these two conditions, how often do I get a valid Sudoku. I will proceed as follows:

1. Generate multiple random 3X3 matrices such that each of the numbers 1 to 9 only appears once
2. Randomly select 9 matrices out of the 3X3 dimensions to get the final Sudoku.

I am pretty sure that I will get a lot of invalid Sudoku, but I am interested in seeing how often that happens. To assess the validity of a generate Sudoku, I will check the following -

1. Sum of rows & columns = 45
2. Sum of each 3x3 matrics = 45
3. Sum of the whole 9X9 matrix = 405.

The last two should be satisfied because I am explicity coding for it, so the only deciding criteria would be the first condition. 

### Attempt 1

1. Generate multiple random 3X3 matrices such that each of the numbers 1 to 9 only appears once
2. Stack these matrices into a 9X9 grid to get the final matrix.
3. Check the validity by doing a row-wise & column-wise sum to ensure they all sum to 45.


```python
import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
import random
import plotly.express as px
```


```python
d = [1,2,3,4,5,6,7,8,9]
valid = []

for i in range(10000000):
    x1 = np.random.choice(d,size=(3,3),replace=False)
    x2 = np.random.choice(d,size=(3,3),replace=False)
    x3 = np.random.choice(d,size=(3,3),replace=False)
    x4 = np.random.choice(d,size=(3,3),replace=False)
    x5 = np.random.choice(d,size=(3,3),replace=False)
    x6 = np.random.choice(d,size=(3,3),replace=False)
    x7 = np.random.choice(d,size=(3,3),replace=False)
    x8 = np.random.choice(d,size=(3,3),replace=False)
    x9 = np.random.choice(d,size=(3,3),replace=False)

    s1 = np.hstack([x1,x2,x3])
    s2 = np.hstack([x4,x5,x6])
    s3 = np.hstack([x7,x8,x9])

    s = np.vstack([s1,s2,s3])
    if (all(s.sum(axis=0) == 45) and all(s.sum(axis=1) ==45)):
        valid.append(1)
    else:
        valid.append(0)


```


```python
sum(valid)
```




    0



After 10M iterations of the above approach, I don't get a single valid Sudoku. I expected to get a lot of invalid Sudokus but I didn't expect the chances to be this low, it's almost null. I need to think of another approach.

### Attempt 2

I created a Sudoku by hand on a whiteboard and it clicked. Each of the 9 sub-matrices in the Sudoku can be derived from the first 3x3 matrix because the 9 matrices are not independent. The available values in each (row,column) combination of the matrices are depended on the values in the other matrices. For example, if the central most value of matrix x1 = 7 then the centre most value of the matrix x2 which is adjacent to x1 cannot be 7, so on & so forth. I don't know if there was any exceptions here, but based on my quick & dirty analysis it does not seem like. 

So in this attempt, I will first randomly generate a 3X3 matrix and the build the remaining 8 matrices based on this. Basically, I will create a matrix like this, here the numbers in the brackets indicate the position of that number in the matrix, first number denotes the row & the second number column.

|(0,0)|(0,1)|(0,2)|
|-----|-----|-----|
|(1,0)|(1,1)|(1,2)|
|(2,0)|(2,1)|(2,2)|

The other matrix will be build based on this to ensure no row-wise or column-wise repetition, so the 3x3 matrix horizontal adjacent to the one above will look like this - 

|(2,0)|(2,1)|(2,2)|
|-----|-----|-----|
|(0,0)|(0,1)|(0,2)|
|(1,0)|(1,1)|(1,2)|


```python
y1 = np.random.choice(d,size=(3,3),replace=False) #Initial random matrix

y2 = np.array([[y1[2,0], y1[2,1], y1[2,2]],
               [y1[0,0], y1[0,1], y1[0,2]],
               [y1[1,0], y1[1,1], y1[1,2]]])

y3 = np.array([[y1[1,0], y1[1,1], y1[1,2]],
               [y1[2,0], y1[2,1], y1[2,2]],
               [y1[0,0], y1[0,1], y1[0,2]]])

y4 = np.array([[y1[0,1],y1[0,2],y1[0,0]],
               [y1[1,1],y1[1,2],y1[1,0]],
               [y1[2,1],y1[2,2],y1[2,0]]])

y5 = np.array([[y4[2,0], y4[2,1], y4[2,2]],
               [y4[0,0], y4[0,1], y4[0,2]],
               [y4[1,0], y4[1,1], y4[1,2]]])

y6 = np.array([[y4[1,0], y4[1,1], y4[1,2]],
               [y4[2,0], y4[2,1], y4[2,2]],
               [y4[0,0], y4[0,1], y4[0,2]]])

y7 = np.array([[y4[0,1],y4[0,2],y4[0,0]],
               [y4[1,1],y4[1,2],y4[1,0]],
               [y4[2,1],y4[2,2],y4[2,0]]])

y8 = np.array([[y7[2,0], y7[2,1], y7[2,2]],
               [y7[0,0], y7[0,1], y7[0,2]],
               [y7[1,0], y7[1,1], y7[1,2]]])

y9 = np.array([[y7[1,0], y7[1,1], y7[1,2]],
               [y7[2,0], y7[2,1], y7[2,2]],
               [y7[0,0], y7[0,1], y7[0,2]]])

m1 = np.hstack([y1,y2,y3])
m2 = np.hstack([y4,y5,y6])
m3 = np.hstack([y7,y8,y9])

m = np.vstack([m1,m2,m3])

(all(m.sum(axis=0) == 45) and all(m.sum(axis=1) ==45))
```

So the above approach works always because all the new matrices are derived from the first matrix. However, it does not look very elegant, so I used Claude Sonnet 3.5 to look for an elegant solution and it found it. I learned that numpy already has functions to do such operations.


```python
import numpy as np

d = [1, 2, 3, 4, 5, 6, 7, 8, 9]

# Create initial random 3x3 matrix
y1 = np.random.choice(d, size=(3,3), replace=False)

# Define row permutations
row_perm1 = [2, 0, 1]
row_perm2 = [1, 2, 0]

# Generate y2 and y3 by row permutations of y1
y2 = y1[row_perm1]
y3 = y1[row_perm2]

# Generate y4 by column rotation of y1
y4 = np.roll(y1, -1, axis=1)

# Generate y5 and y6 by row permutations of y4
y5 = y4[row_perm1]
y6 = y4[row_perm2]

# Generate y7 by column rotation of y4
y7 = np.roll(y4, -1, axis=1)

# Generate y8 and y9 by row permutations of y7
y8 = y7[row_perm1]
y9 = y7[row_perm2]

m1 = np.hstack([y1,y2,y3])
m2 = np.hstack([y4,y5,y6])
m3 = np.hstack([y7,y8,y9])

m = np.vstack([m1,m2,m3])

(all(m.sum(axis=0) == 45) and all(m.sum(axis=1) ==45))

```




    True



### Making the actual Sudoku

So that works, now I can just randomly erase some elements from each matrix to get a complete Sudoku puzzle. There are some other things which I have not considered, for example - is this the only way? does the sudoku have an unique solution etc? This can be a subject of another post.



```python
# Create a copy of the solution
solution = m.copy()

# Remove random elements to create the puzzle
num_to_remove = 40  # Adjust this number to control difficulty
indices = np.arange(81)
np.random.shuffle(indices)
for i in indices[:num_to_remove]:
    m[i // 9, i % 9] = 0  # Use 0 to represent empty cells
```
### Interactive Demo

I've implemented an interactive version of this Sudoku generator using JavaScript. You can try it out below:

<iframe src="/assets/sudoku-generator/sudoku-html.html" width="100%" height="600px" frameborder="0"></iframe>

Feel free to generate new puzzles and solve them right here on the page!