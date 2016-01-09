# Exhibit Specifications

*Note*: All exhibits NOT in the data arcade are priority since they are scene-specific, data arcade exhibits could be punted or saved for another run. However, we should have a goal of at least a few in the arcade.

**Mirror Mirror**

```
Scene: Amelia's Bedroom,
Description: Mirror that a user can check in to and then have personalized words of encouragement as well as basic information displayed around their reflection.,
Sign-In: RFID Bracelet Scan,
Inputs: {
	static: [Current Time, Weather, Date],
	personal: [Calendar Events, Employment/School Info, Positive Comments, Feed Data (could be off of Twitter/Facebook or could be spoofed by just grabbing some news headlines based on a search query)]
	},
Outputs: { 
	static: [Clock, Forecast, Date],
	personal: [Upcoming Events, Positive reinforcement about school or work, user comments about you, news/daily activity feed]
	}
Display: screen behind mirror   
```

**How you're tracked**

```
Scene: Amelia's Office,
Description: You see a very simple aggregation of some news and comments, but everywhere your mouse hovers, every time you click something, you see data accruing in a little box at the bottom. When you click "Done Surfing", you get a small network graph of who tracked you and what data was collected.,
Sign-In: RFID Bracelet Scan,
Inputs: {
	static: [Current news headlines with links to articles (Reddit, Tumblr, Google News), Sexy celeb photo],
	personal: [Social Media Comments, Gmail or other message text, Personal Contacts]
	}
Outputs: {
	static: News Articles with clickable headline (maybe photo?),
	personsal: [Fake news about friends, social media updates, fake news about you]
	final: [short list of trackers and companies that tracked either with template text for a narrative or a little UD graph, a little list of data we collected from your mouse and browsing.] 
	}
Display: Screen
```

**Highly Recommended**

```
Scene: Data Arcade,
Description: Choose quickly between two choices where slowly our recommender tries to influence your choice.,
Sign-In: RFID Bracelet,
Inputs: survey data,
Outputs: Collaborative Filter Recommendation,
Display: Projector
```

**Personalized News**

```
Scene: Amelia's Reading Nook,
Description: See the same news article with text rendered 4-5 different ways pending who is reading,
Sign-In: RFID Bracelet,
Inputs: [News Posts on Twitter/Facebook, Facebook Interests, Email Text],
Outputs: A category 1-5 that chooses which news article you'll see, 
Display: Projector
```

**Mental Health**

Still working on this one since it could go a few ways (ie, not use any prior data or use a little bit to customize questions)	

```
Scene: Amelia's Office - Meditation Area,
Description: Answer leading questions that summarize your current mental health,
Sign-In: RFID Bracelet,
Inputs:
Outputs:
Display: Screen?
```

**Own Up**

```
Scene: Data Arcade,
Description: Up to 4 players see quotes and have the choice to own up to it being theirs. At the end the things no one would own up to float around until the next game.
Sign In: 4 or less RFID Bracelets in Succession until Start button is pressed,
Inputs: [Comments, Emails, Tweets, ?Other Exhibit Data?],
Outputs: Text Blobs,
Display: Screen
```

**Neural Net Art**

```
Scene: Amelia's Art Studio,
Description: Scrolling images of people in audience redone in a painters' style as if Amelia has made them.,
Sign-in: None,
Inputs: [User Photos (instagram, facebook), seed painting],
Outputs: Painted Image,
Display: Electric Object rendering from URL
```

**Memory Planting**

Micha, this one is yours if you want to detail it

```
Scene: Either Art Studio, Reading Nook, or Data Arcade,
Description: See photos of yours where faces have been swapped to have Amelia in them or switching your friends. We may have some prompting system to try and get you to recall these memories in a short text blurb.
Sign-in: RFID Bracelet,
Inputs: User Photos,
Outputs: Face-swapped photos,
Display: ?Screen or Projector?
```

**Terms of Service Game**

```
Scene: Data Arcade (should looked hacked),
Description: Before playing a game you have to agree to terms of service, but you keep having to agree to more and more until you won't. We report on how much you were willing to give up.
Sign-in: RFID Bracelet,
Input: Nothing,
Output: How many rights were you willing to give up,
Display: ?Screen or Projector?
```

**Truth Game**

```
Scene: Data Arcade,
Description: You're given a "fact" and have to decide if was made up click bait, an ad, or real news. Maybe have it where you play against friends?
Sign-in: RFID Bracelet,
Inputs: Statistics of media usage, Maybe your news/political leanings; otherwise, nothing,
Outputs: A list of facts tagged by what they are,
Display: ? Screen or Projector?
```

**Soothsayer**

```
Scene: Data Arcade,
Description: Make "data-driven" predictions where some things are made from real data, some from astrology, and some absolute random. At the end we tell you how susceptible you are.,
Sign-in: RFID Bracelet,
Inputs: [Interests, statistics of media usage, health-consciousness? (from comments or associated brands), employment data, birthday],
Outputs: List of fake text blurbs that are predictions,
Display: Screen
```

**Fake Job Interview**

```
Scene: Amelia's Office,
Description: Don gets a few facts that about users to decide what kind of jobs they could/could not do.
Sign-in: RFID Bracelet,
Inputs: [Employment data, interests, photos, comment streams, statistics of media usage],
Outputs: [Short list of text with (maybe) a photo],
Display: Screen or Mobile App
```

**Romance Matcher**

```
Scene: Bar,
Description: Two players prioritize their romantic interests then get questions to see how they match up with the others priorities. At the end they get a match rating.,
Sign-in: RFID Bracelet,
Inputs: [Interests, employment, statistics of media usage, a few quotes?],
Outputs: At the end when match is shown a few pieces of data can be revealed to contrast the app's match,
Display: Screen
```

**Chatter**

```
Scene: Data Arcade paired with a terminal placed somewhere else (TBD, but maybe in lobby during sign in or ) on set,
Description: Chat with random people with bots that interfere with your conversation,
Sign-in: RFID Bracelet then name a handle,
Inputs: [Statistics of data usage, a few quotes, interests],
Outputs: [conversation topic suggestions, bits of information about who you're talking to],
Display: Screen
```
	
**SnapChat Booth**

```
Scene: Data Arcade,
Description: You sign in and then get a set of tiles you can select of little snap videos on topics or from people based on your interest. Then you film a small snap video on a topic of your choosing.,
Sign-in: RFID Bracelet,
Inputs: Interests,
Outputs: Topic-related videos that were pre-added, come from an online stream or are from other guests,
Display: ?Screen or projector?
```

