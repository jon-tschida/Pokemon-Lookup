# Pokemon-Lookup

## Tech used:
- HTML
- CSS
- JavaScript
- [PokeAPI](https://pokeapi.co)

### Purpose for creating this project

This was made after the weather app, and I wanted to continue to work more with API data. I also wanted to try to create a unique project that hadn't been created a thousand times by a thousand other aspiring devs (much like the weather app). I enjoy video games and the PokeAPI is a free API without any ratelimits, so I figured this was a good project to tackle. A simple pokeLookup app which gave some base level details to any Pokemon the user wanted.  

### Challenges that arrose

** Slowing down user submissions **

I realized the user could click the `submit` button as many times as they like right in a row. This messed with the layout and we didn't need to slam the pokeAPI that much anyways. To remedy this, we created a variable called `clicked` which was set to 0 by default, when the user clicks the `submit` button, it increased to 1. If `clicked` was equal to 1, then the API was called. We then just used the `setTimeout()` method to reduce `clicked` back to 0, effectively giving the form a 5 second cooldown. 

I'm not sure if this is the most elegant solution, I'm sure there is a way to add the entire event handler into a timeout to prevent needing another variable, but at the time this felt like the easiest solution. 

** Creating styling for the different Pokemon types **

Each Pokemon has a type (Electric, Fighting, Fairy, etc) and when displaying the type(s) of the Pokemon, I wanted each type to have a different background color. To accomplish this, I created the different CSS class names for the desired styling of each type. I named these classes in the CSS file with the same nomenclature as the API (all lower-case, no special characters), so we could dynamically style the element via the `PopulateTypes()`, below the highlighted line shows the class name being added dynamically via the info from the PokeAPI:

```
<p class="types **${data.types[i].type.name}** ">${capitalize(data.types[i].type.name)}</p>
```

### What I learned 

This continued to solidify my HTML and CSS capabilities, I still have a lot to learn about media queries and making pages mobile ready, but I'm happy with how we are progressing and getting more comfortable with using vanilla CSS and HTML. I think this will give a good baseline for learning React, Sass, and other frameworks down the road. 
