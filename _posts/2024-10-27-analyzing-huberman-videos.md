---
layout: post
title: "Analyzing Huberman Lab Podcast Performance"
date: 2024-10-27
categories: [data-analysis, youtube]
---

I started watching Huberman lab podcast in 2021 during the Covid period. I learned a lot from his videos and I also incorporated some of the ideas into my life. I found the content to be really valuable. I watched him consistently till about mid to late 2022. After that, the world opened up so there was a lot more content and his new videos were becoming quite niche for my interest, so I kind of dropped off. I still subscrbie to his channel but haven't watched a new video in a long time. Recently, when I was browsing I noticed that views on his new videos were relatively low compared to earlier videos, so I decided the analyze the performance of his videos using the data from Youtube's public API. This blog will discuss my findings.

#### Basic stats

I downloaded the data for all the videos on the channel till data. Based on basic exploration, there are 255 videos including shorts, mean video duration is 117 mins, and mean views are 1.31MM. That's not bad at all. Some other data is also there in the table providing a basic overviews.

<pre style="white-space:pre;overflow-x:auto;line-height:normal;font-family:Menlo,'DejaVu Sans Mono',consolas,'Courier New',monospace">╭──────────────────────────────────────────────── skimpy summary ─────────────────────────────────────────────────╮
│ <span style="font-style: italic">         Data Summary         </span> <span style="font-style: italic">      Data Types       </span>                                                          │
│ ┏━━━━━━━━━━━━━━━━━━━┳━━━━━━━━┓ ┏━━━━━━━━━━━━━┳━━━━━━━┓                                                          │
│ ┃<span style="color: #008080; text-decoration-color: #008080; font-weight: bold"> dataframe         </span>┃<span style="color: #008080; text-decoration-color: #008080; font-weight: bold"> Values </span>┃ ┃<span style="color: #008080; text-decoration-color: #008080; font-weight: bold"> Column Type </span>┃<span style="color: #008080; text-decoration-color: #008080; font-weight: bold"> Count </span>┃                                                          │
│ ┡━━━━━━━━━━━━━━━━━━━╇━━━━━━━━┩ ┡━━━━━━━━━━━━━╇━━━━━━━┩                                                          │
│ │ Number of rows    │ 255    │ │ int64       │ 3     │                                                          │
│ │ Number of columns │ 6      │ │ string      │ 2     │                                                          │
│ └───────────────────┴────────┘ │ float64     │ 1     │                                                          │
│                                └─────────────┴───────┘                                                          │
│ <span style="font-style: italic">                                                    number                                                    </span>  │
│ ┏━━━━━━━━━━━━━━┳━━━━━┳━━━━━━━┳━━━━━━━━━━┳━━━━━━━━━━┳━━━━━━━━━┳━━━━━━━━┳━━━━━━━━┳━━━━━━━━━┳━━━━━━━━━━┳━━━━━━━━┓  │
│ ┃<span style="font-weight: bold"> column_name  </span>┃<span style="font-weight: bold"> NA  </span>┃<span style="font-weight: bold"> NA %  </span>┃<span style="font-weight: bold"> mean     </span>┃<span style="font-weight: bold"> sd       </span>┃<span style="font-weight: bold"> p0      </span>┃<span style="font-weight: bold"> p25    </span>┃<span style="font-weight: bold"> p50    </span>┃<span style="font-weight: bold"> p75     </span>┃<span style="font-weight: bold"> p100     </span>┃<span style="font-weight: bold"> hist   </span>┃  │
│ ┡━━━━━━━━━━━━━━╇━━━━━╇━━━━━━━╇━━━━━━━━━━╇━━━━━━━━━━╇━━━━━━━━━╇━━━━━━━━╇━━━━━━━━╇━━━━━━━━━╇━━━━━━━━━━╇━━━━━━━━┩  │
│ │ <span style="color: #af87ff; text-decoration-color: #af87ff">views       </span> │ <span style="color: #008080; text-decoration-color: #008080">  0</span> │ <span style="color: #008080; text-decoration-color: #008080">    0</span> │ <span style="color: #008080; text-decoration-color: #008080"> 1322000</span> │ <span style="color: #008080; text-decoration-color: #008080"> 2018000</span> │ <span style="color: #008080; text-decoration-color: #008080">  28820</span> │ <span style="color: #008080; text-decoration-color: #008080">279300</span> │ <span style="color: #008080; text-decoration-color: #008080">654900</span> │ <span style="color: #008080; text-decoration-color: #008080">1479000</span> │ <span style="color: #008080; text-decoration-color: #008080">15500000</span> │ <span style="color: #008000; text-decoration-color: #008000">  ▇▁  </span> │  │
│ │ <span style="color: #af87ff; text-decoration-color: #af87ff">likes       </span> │ <span style="color: #008080; text-decoration-color: #008080">  0</span> │ <span style="color: #008080; text-decoration-color: #008080">    0</span> │ <span style="color: #008080; text-decoration-color: #008080">   24950</span> │ <span style="color: #008080; text-decoration-color: #008080">   34330</span> │ <span style="color: #008080; text-decoration-color: #008080">   1406</span> │ <span style="color: #008080; text-decoration-color: #008080">  7034</span> │ <span style="color: #008080; text-decoration-color: #008080"> 14560</span> │ <span style="color: #008080; text-decoration-color: #008080">  29840</span> │ <span style="color: #008080; text-decoration-color: #008080">  288600</span> │ <span style="color: #008000; text-decoration-color: #008000">  ▇▁  </span> │  │
│ │ <span style="color: #af87ff; text-decoration-color: #af87ff">comments    </span> │ <span style="color: #008080; text-decoration-color: #008080">  0</span> │ <span style="color: #008080; text-decoration-color: #008080">    0</span> │ <span style="color: #008080; text-decoration-color: #008080">    1487</span> │ <span style="color: #008080; text-decoration-color: #008080">    1646</span> │ <span style="color: #008080; text-decoration-color: #008080">     26</span> │ <span style="color: #008080; text-decoration-color: #008080">   523</span> │ <span style="color: #008080; text-decoration-color: #008080">  1033</span> │ <span style="color: #008080; text-decoration-color: #008080">   1809</span> │ <span style="color: #008080; text-decoration-color: #008080">   13010</span> │ <span style="color: #008000; text-decoration-color: #008000">  ▇▁  </span> │  │
│ │ <span style="color: #af87ff; text-decoration-color: #af87ff">duration    </span> │ <span style="color: #008080; text-decoration-color: #008080">  0</span> │ <span style="color: #008080; text-decoration-color: #008080">    0</span> │ <span style="color: #008080; text-decoration-color: #008080">   117.2</span> │ <span style="color: #008080; text-decoration-color: #008080">   59.48</span> │ <span style="color: #008080; text-decoration-color: #008080"> 0.6333</span> │ <span style="color: #008080; text-decoration-color: #008080"> 90.73</span> │ <span style="color: #008080; text-decoration-color: #008080"> 124.8</span> │ <span style="color: #008080; text-decoration-color: #008080">  154.5</span> │ <span style="color: #008080; text-decoration-color: #008080">   279.4</span> │ <span style="color: #008000; text-decoration-color: #008000">▃▂▇▆▁ </span> │  │
│ └──────────────┴─────┴───────┴──────────┴──────────┴─────────┴────────┴────────┴─────────┴──────────┴────────┘  │
│ <span style="font-style: italic">                                                    string                                                    </span>  │
│ ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━━┳━━━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │
│ ┃<span style="font-weight: bold"> column_name                </span>┃<span style="font-weight: bold"> NA     </span>┃<span style="font-weight: bold"> NA %       </span>┃<span style="font-weight: bold"> words per row                </span>┃<span style="font-weight: bold"> total words              </span>┃  │
│ ┡━━━━━━━━━━━━━━━━━━━━━━━━━━━━╇━━━━━━━━╇━━━━━━━━━━━━╇━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╇━━━━━━━━━━━━━━━━━━━━━━━━━━┩  │
│ │ <span style="color: #af87ff; text-decoration-color: #af87ff">title                     </span> │ <span style="color: #008080; text-decoration-color: #008080">     0</span> │ <span style="color: #008080; text-decoration-color: #008080">         0</span> │ <span style="color: #008080; text-decoration-color: #008080">                          11</span> │ <span style="color: #008080; text-decoration-color: #008080">                    2919</span> │  │
│ │ <span style="color: #af87ff; text-decoration-color: #af87ff">publish_date              </span> │ <span style="color: #008080; text-decoration-color: #008080">     0</span> │ <span style="color: #008080; text-decoration-color: #008080">         0</span> │ <span style="color: #008080; text-decoration-color: #008080">                           1</span> │ <span style="color: #008080; text-decoration-color: #008080">                     255</span> │  │
│ └────────────────────────────┴────────┴────────────┴──────────────────────────────┴──────────────────────────┘  │
╰────────────────────────────────────────────────────── End ──────────────────────────────────────────────────────╯
</pre>

#### Views & Engagement

I want to see how the views of the channel have evolved over time. First I will see cumulative views overtime, I will also just focus on long form content and exclude any videso under 3 mins. Looking at the chart below, there is some flatness from start of 2024 right after the 300MM cumulative videos.

![Cumulative Views over time](/cumulative_views.png)

I want to see how the trend looks if we see views per video by year. If there is a slow-down in the views, it might show up here. 

![Views per video](/views_per_video.png)

From the above chart, it looks like the 2024 videos are getting lower views than previous years. I think this is because Huberman has already exhausted all the hot topics in the health space, so his recent videos are going towards more niche topics. I also noticed that he deviating from the core health space and getting into some areas which are not yet established. This makes sense to me because the research in health space progresses at a slower pace compared to his ability to make new videos. Another factor could be that he simply publishes less videos or his videos are less engaging so he is not getting the 'love' from YT's algorithms.

![Videos per month](/videos_per_month.png)

There isn't a marked change in his video production in 2024, it is similar to previous years, except April 2024 where it is 11. Even if I exclude AMA & live-event, it is still about 8. So video production is not a reason. Next, I want to look at engagement as measured by likes per video & comments per video. My hypothesis is that the videos which are liked a lot & commented on tend to be boosted by YT's algorithm so they have a higher change of going viral and getting more views.
    
![png](/youtube_data_20_1.png)

There is a strong positive correlation between views per video (v_per_v), likes per video (l_per_v) & comments per video (c_per_v). Although, I can't infer much here because it is difficult to understand the direction of association. In some sense, higher views will lead to more likes & comments, but I don't know how much of these likes & comments drive future views. To analyze this, I would need more granular data about evolution of views, likes & comments for a video over time which is not available with the public API.

I am curious to see how l_per_v & c_per_v have evolved over the last few years.

![likes & comments per video](/likes_comments.png)

Likes and comments per videos are bit on the lower side but it is not clear how much of this is just driven by decline in views and how much of this is because of the qualitative factors related to the video itself. Lastly, I want to look at how views per like and views per comments have evolved overtime in a cumulative fashion. I think this might tell me about the level of engagement of the vidoes.

![ratio](/ratio.png)

Similar to cumulative views, there is a flattening & even a decline in the ratio of views to likes & views to comments. So for every like & comment a video is getting, the number of views it gets is dropping. This sounds like it could be algorithm driven as it is devaluing the likes & comments, hence it is not exposing the content to more people. There could be other factors like view through rates of a video or just vidoes becoming too niche that is driving it. Without access to more granular data and insights into operations of YT's algorithm it is difficult to be certain. The last factor could simply be that more people are listening to the podcast on other platforms & hence YT growth is stalling. Anyways, my initial hunch about Huberman videos getting lesser views compared to previous years seems valid.
