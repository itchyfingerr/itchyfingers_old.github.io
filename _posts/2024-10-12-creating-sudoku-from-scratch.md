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

<details>
  <summary>Click to expand!</summary>

```python
import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
import random

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
</details>


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

<details>
  <summary>Click to expand!</summary>

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


```
</details>


```python
print(np.matrix(m))
```

    [[3 4 8 5 7 6 2 1 9]
     [2 1 9 3 4 8 5 7 6]
     [5 7 6 2 1 9 3 4 8]
     [4 8 3 7 6 5 1 9 2]
     [1 9 2 4 8 3 7 6 5]
     [7 6 5 1 9 2 4 8 3]
     [8 3 4 6 5 7 9 2 1]
     [9 2 1 8 3 4 6 5 7]
     [6 5 7 9 2 1 8 3 4]]


So the above approach works always because all the new matrices are derived from the first matrix. The Sudoku produced by this approach is always valid but it is too easy to solve. The patterns are repeating so identifying one pattern provides the whole solution.

What happens if I just shuffle the rows & columns to remove the fixed patterns? This approch randomizes the overall Sudoku but it violates the third condition of a valid Sudoku i.e. each 3X3 block should also add up exactly to 45. This what I observe below.

<details>

<summary>Click to expand!</summary>


```python
import numpy as np

d = [1, 2, 3, 4, 5, 6, 7, 8, 9]

def sudoku_gen(row_perm1 = [2,0,1], row_perm2 = [1,2,0]):


    # Create initial random 3x3 matrix
    y1 = np.random.choice(d, size=(3,3), replace=False)

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
    
    row_1 = [y1, y2, y3]
    row_2 = [y4, y5, y6]
    row_3 = [y7, y8, y9]
    
    indices = np.random.choice(len(row_1), size=3, replace=False)

    m1 = np.hstack(row_1)
    m2 = np.hstack(row_2)
    m3 = np.hstack(row_3)

    cols = [m1, m2, m3]

    col_indices = np.random.choice(len(cols), size=3, replace=False)

    #m = np.vstack([cols[i] for i in col_indices])
    n = np.vstack(cols)

    #Randomizing the columns & rows to remove the obvious patterns
    
    # Shuffle rows
    np.random.shuffle(n)
    
    # Shuffle columns
    n = n.T
    np.random.shuffle(n)
    n = n.T
    
    return n


```

</details>

```python
sudoku_gen()
```




    array([[4, 5, 7, 3, 9, 2, 1, 8, 6],
           [3, 4, 6, 5, 2, 1, 9, 7, 8],
           [5, 3, 8, 4, 1, 9, 2, 6, 7],
           [2, 9, 3, 1, 6, 8, 7, 4, 5],
           [9, 1, 4, 2, 7, 6, 8, 5, 3],
           [7, 8, 9, 6, 4, 3, 5, 1, 2],
           [1, 2, 5, 9, 8, 7, 6, 3, 4],
           [6, 7, 2, 8, 3, 5, 4, 9, 1],
           [8, 6, 1, 7, 5, 4, 3, 2, 9]])



### Attempt 3

I ended reading bunch of articles about Sudoku solving & generating. Contrary to my expectations, generating a sudoku which is fun to play & also valid is not a trivial problem. While watching the computerphile video on sudoku solving, I realized that I can generate a matrix with zeroes and implement a solver on top of it. This way I can get a valid sudoku and it is also interesting to play. When starting with a zero matrix, the first row always ends up being 1 to 9, so to make it more interesting, I will randomly generate the diagonal 3x3 matrices and then implement the solver.

#### Starter matrix

<details>

<summary>Click to expand!</summary>


```python

def start_mat():
    d = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    y1 = np.random.choice(d, size=(3,3), replace=False)
    y5 = np.random.choice(d, size=(3,3), replace=False)
    y9 = np.random.choice(d, size=(3,3), replace=False)

    y2 = np.zeros((3,3), dtype=int)
    y3 = np.zeros((3,3), dtype=int)
    y4 = np.zeros((3,3), dtype=int)
    y6 = np.zeros((3,3), dtype=int)
    y7 = np.zeros((3,3), dtype=int)
    y8 = np.zeros((3,3), dtype=int)

    row_1 = [y1, y2, y3]
    row_2 = [y4, y5, y6]
    row_3 = [y7, y8, y9]

    m1 = np.hstack(row_1)
    m2 = np.hstack(row_2)
    m3 = np.hstack(row_3)

    cols = [m1, m2, m3]

    s = np.vstack(cols)
    return s
```

</details>


```python
np.array(start_mat())
```




    array([[7, 1, 9, 0, 0, 0, 0, 0, 0],
           [4, 3, 5, 0, 0, 0, 0, 0, 0],
           [2, 8, 6, 0, 0, 0, 0, 0, 0],
           [0, 0, 0, 9, 7, 4, 0, 0, 0],
           [0, 0, 0, 1, 6, 3, 0, 0, 0],
           [0, 0, 0, 8, 2, 5, 0, 0, 0],
           [0, 0, 0, 0, 0, 0, 5, 3, 8],
           [0, 0, 0, 0, 0, 0, 6, 2, 1],
           [0, 0, 0, 0, 0, 0, 4, 7, 9]])



#### Solver functions

I will use two functions that I learned from the computerphile video. The first function will check whether a given digit is valid in the cell and the second function will use the first function and traverse through the entire grid. I really like this solution, it is very neat and elegant. While working on this, I learned that if the initial sudoku is in matrix format, the algorithm does not work, not sure why.

#### Function 1


```python
def possible(y,x,n,s):
    for i in range(0,9):
        if s[y,i] == n:
            return False
    for i in range(0,9):
        if s[i,x] == n:
            return False
    x0 = (x//3)*3
    y0 = (y//3)*3
    for i in range(0,3):
        for j in range(0,3):
            if s[y0+i][x0+j] == n:
                return False
    return True
```

#### Function 2


```python
def solve(s):
    for y in range(9):
        for x in range(9):
            if s[y,x] == 0:
                for n in range(1,10):
                    if possible(y,x,n,s):
                        s[y][x] = n
                        if solve(s):
                            return True
                        s[y][x] = 0
                return False
    print(np.matrix(s))
    return True

    
```

#### Final Sudoku


```python
solve(s)
```

    [[7 1 9 2 3 6 8 4 5]
     [4 3 5 7 1 8 2 9 6]
     [2 8 6 4 5 9 3 1 7]
     [3 6 8 9 7 4 1 5 2]
     [5 2 7 1 6 3 9 8 4]
     [1 9 4 8 2 5 7 6 3]
     [9 7 1 6 4 2 5 3 8]
     [8 4 3 5 9 7 6 2 1]
     [6 5 2 3 8 1 4 7 9]]


### Making the actual Sudoku

So that works, now I can just randomly erase some elements from each matrix to get a complete Sudoku puzzle. There are some other things which I have not considered, for example - is this the only way? does the sudoku have an unique solution etc? 


```python
# Create a copy of the solution
solution = s.copy()

# Remove random elements to create the puzzle
num_to_remove = 55 # Adjust this number to control difficulty
indices = np.arange(81)
np.random.shuffle(indices)
for i in indices[:num_to_remove]:
    s[i // 9, i % 9] = 0  # Use 0 to represent empty cells
```

    Sudoku Puzzle:
    ┌───────┬───────┬───────┐
    │ 5 . . │ . . . │ . . 2 │
    │ . . . │ . 9 . │ . . . │
    │ . . . │ . . . │ . . . │
    ├───────┼───────┼───────┤
    │ . . . │ . . . │ 4 2 3 │
    │ . . 6 │ 8 . . │ . 9 . │
    │ . . . │ 9 . 4 │ . 5 . │
    ├───────┼───────┼───────┤
    │ 9 . 1 │ . . . │ . . 4 │
    │ . 8 7 │ . 1 . │ 6 3 5 │
    │ 3 . 5 │ 2 . . │ . 7 9 │
    └───────┴───────┴───────┘


