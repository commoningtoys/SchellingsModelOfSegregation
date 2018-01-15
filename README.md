# Schellings Model of Segregation Web APP
[WEB APP](https://commoningtoys.github.io/SchellingsModelOfSegregation/)
--------------------------------------------
The Schelling's model of segregation analyzes the dynamics occuring inside neighborhoods, where its inhabitants show remarkable differences in gender, age, ethnicity, language, sexual preference, and religion. From now on I will call this remarkable differences features. In this model we have a grid where each agent is placed. Each agent has its own feature and a threshold. The threshold is the tollerance an agent has. The threshold defines how many agent with different feature can live nearby.

For example let's assume a model with two possible genders that we represent with 1 and 0

| \ | 1 |  2  | 3 | 4 | 5 |
| :---: |:---:| :---:| :---: | :---: | :---: |
| **1** | 0 | 0 | 0 | # | 1 |
| **2** | 1 | 0 | 1 | 0 | 0 |
| **3** | 0 | 1 | 0 | 1 | 0 |
| **4** | 0 | 1 | 1 | # | 0 |
| **5** | 1 | 1 | 1 | 1 | 0 |


We consider a neighbourhood as a 5x5 grid. We assume that every agent has a threshold of 30%. Every agent checks for his neighbours, if more than 30% of them are different than him, than he will move to one of the free spots marked with a #.

Here I reproduce the grid and I mark the agent that will move like [this]()

| \ | 1 |  2  | 3 | 4 | 5 |
| :---: |:---:| :---:| :---: | :---: | :---: |
| **1** | [0]() | [0]() | 0 | # | [1]() |
| **2** | [1]() | 0 | 1 | 0 | 0     |
| **3** | [0]() | [1]() | [0]() | [1]() | 0 |
| **4** | [0]() | [1]() | 1 | # | [0]()|
| **5** | [1]() | 1 | 1 | [1]() | [0]() |

All the agents marked in blue will ove to one of the empty spots. This process goes on and on until an equilibrium is reached. In this case if you reproduce the same setting on the [WEB APP](https://commoningtoys.github.io/SchellingsModelOfSegregation/) it will end up with one agent costantly moving without finding the right spot where he can settle.

![img](https://user-images.githubusercontent.com/17408277/31388131-4de53844-adcd-11e7-8d40-bd9f60be120a.png)
