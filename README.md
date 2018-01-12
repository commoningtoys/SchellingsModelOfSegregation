# Schellings Model of Segregation Web APP
[WEB APP](https://commoningtoys.github.io/SchellingsModelOfSegregation/)
--------------------------------------------
The Schelling's model of segregation analyzes the dynamics occuring inside neighborhoods, where its inhabitants show remarkable differences in gender, age, ethnicity, language, sexual preference, and religion. From now on I will call this remarkable differences features. In this model we have a grid where each agent is placed. Each agent has its own feature and a threshold. The threshold is the tollerance an agent has. The threshold defines how many agent with different feature can live near himself.

For example let's assume a model with two possible genders that we represent with 1 and 0

| 1 | 1 | 0  |
| :---: |:---:| :---:|
| 1 | 0* | 0 |
| 1 | 1 | 0 |

we consider a neighbourhood as a 3*3 grid. The agent in the middle checks his neighbours. 3 out of 8 have gis same gender the others have a different gender. If the agent has a threshold of 30% he will staz if it's higher >40% he will move somewhere else.


![img](https://user-images.githubusercontent.com/17408277/31388131-4de53844-adcd-11e7-8d40-bd9f60be120a.png)
