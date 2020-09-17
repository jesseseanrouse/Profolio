// My Google spreadsheet link
// https://spreadsheets.google.com/feeds/list/1Gy2RhQ_KJXX7U8FUJi-GXtvBNQlWTj140rriT0dlnDY/od6/public/values?alt=json
// https://spreadsheets.google.com/feeds/list/1-Up49GfxfVEBnoHS6582z36VSLD55QNY-4Nvc-GZdTo/od6/public/values?alt=json

// So I can see the array
const viewArr = (array) => {
	console.log(array);
};
// To start the carousel
let carousel = 1;
const caraStart = () => {
    let x = screen.width;
    $(`.projectList li:nth-of-type(1)`).css('display', 'flex');
    $(`.projectList li:nth-of-type(1)`).css('flex-direction', 'column');
    $(`.projectList li:nth-of-type(1)`).css('align-items', 'center');
    if (x > 500) {
        $(`.projectList li:nth-of-type(3)`).css('display', 'flex');
		$(`.projectList li:nth-of-type(3)`).css('flex-direction', 'column');
        $(`.projectList li:nth-of-type(3)`).css('align-items', 'center');
        if (x > 1023) {
            $(`.projectList li:nth-of-type(2)`).css('display', 'flex');
			$(`.projectList li:nth-of-type(2)`).css('flex-direction', 'column');
			$(`.projectList li:nth-of-type(2)`).css('align-items', 'center');
        }
    }
}
// new carousel/Quotes code
let carouselQuote = 1
const carouselStartQuote = () => {
    $(`.quotesList li:nth-of-type(1)`).css('display', 'flex');
}
const carouselQuotesPrev = (x) => {
    if (carouselQuote === 1) {
        carouselQuote = x;
        $(`.quotesList li:nth-of-type(1)`).css('display', 'none');
        $(`.quotesList li:nth-of-type(${x})`).css('display', 'flex');
    } else {
        $(`.quotesList li:nth-of-type(${carouselQuote})`).css('display', 'none');
        carouselQuote-- 
        $(`.quotesList li:nth-of-type(${carouselQuote})`).css('display', 'flex');
    }
}
const carouselQuotesNext = (x) => {
	if (carouselQuote === x) {
		carouselQuote = 1;
		$(`.quotesList li:nth-of-type(${x})`).css('display', 'none');
		$(`.quotesList li:nth-of-type(1)`).css('display', 'flex');
	} else {
		$(`.quotesList li:nth-of-type(${carouselQuote})`).css('display', 'none');
        carouselQuote++ 
        $(`.quotesList li:nth-of-type(${carouselQuote})`).css('display', 'flex');
	}
};


// My attempt to create an array that sticks beyond the function
// var googleArr = []

// This took longer than I thought but oddly enough it had little to do with set backs just very time consuming to get done.
const addProject2Index = (projectsArr) => {
    let i = 0;
    while (i < projectsArr.length) {
	// while (i < projectsArr.length) {
        $('.projectList').append('<li>' + '</li>');
        let n = i + 1
		let title = projectsArr[i].title;
        $(`.projectList li:nth-of-type(${n})`).append(
					'<header>' + title + '</header>'
				);
        // Final: click on image and go to link
        // Holy Code Batman I got it working
        let link = projectsArr[i].link;
        $(`.projectList li:nth-of-type(${n})`).append(`<a href="${link}"></a>`);
        let imgDescription = projectsArr[i].description
        let $img = $('<img>');
        $img.attr('src', projectsArr[i].image);
        $img.attr('title', imgDescription + " -Click to go to website")
        $(`.projectList li:nth-of-type(${n}) a`).append($img);
        $(`.projectList li:nth-of-type(${n})`).append(
					'<footer>This is a footer</footer>'
				);
		i++;
    }
    caraStart();
};

const addQuotes2Index = (quoteArr) => {
    let i = 0;
    let count = quoteArr.length
    while (i < quoteArr.length) {
        $('.quotesList').append('<li>' + '</li>');
        let n = i + 1
        let quote = quoteArr[i].quote;
        $(`.quotesList li:nth-of-type(${n})`).append('<p>' + quote + '</p>');
        let author = quoteArr[i].author;
        $(`.quotesList li:nth-of-type(${n})`).append('<footer>' + '- ' + author + '</footer>');
        i++;
    }
    carouselStartQuote();
    $('.nextCaraQuote').on('click', () => {
        carouselQuotesNext(count);
    })
    $('.prevCaraQuote').on('click', () => {
        carouselQuotesPrev(count);
    })
}

$.ajax({
	url: "https://spreadsheets.google.com/feeds/list/1Gy2RhQ_KJXX7U8FUJi-GXtvBNQlWTj140rriT0dlnDY/od6/public/values?alt=json",
}).then( sheet => {
        // so I can play find the path
        // console.log(sheet)
        // following the Joe's repo to do this
        const project = sheet.feed.entry.map(project =>{
            return {
                title: project.gsx$title.$t,
                link: project.gsx$link.$t,
                description: project.gsx$description.$t,
                image: project.gsx$image.$t
            }
        })

        // viewArr(project)
        addProject2Index(project);
	}
);

$.ajax({url: 'https://spreadsheets.google.com/feeds/list/1-Up49GfxfVEBnoHS6582z36VSLD55QNY-4Nvc-GZdTo/od6/public/values?alt=json',}).then( sheet => {
        const quotes = sheet.feed.entry.map(quotes => {
            return {
                author: quotes.gsx$author.$t,
                quote: quotes.gsx$quote.$t
            }
        })
        // viewArr(quotes)
        addQuotes2Index(quotes);
    }
);

// w3schools format decided to go with it.
$('.navIcon').on('click', () => {
    let menu = document.getElementById("navLinks")
    if (menu.style.display === "flex") {
        menu.style.display = "none"
    } else {
        menu.style.display = "flex"
    }
});
// Wanted a little more functionality for the nav button
// works as intended however a little wonky if used in developer mode because x is read for the loading of site and not when you change it
$('a').on('click', () => {
    let menu = document.getElementById("navLinks")
    let x = screen.width;
    if (x < 500) {
        menu.style.display = "none"
    }
})

// viewArr(googleArr);

// Carousel Javascript
$('.prevCara').on('click', () => {
    let x = screen.width;
    if (x < 500) {
		if (carousel === 1) {
			carousel = 3;
			$(`li:nth-of-type(1)`).css('display', 'none');
			$(`li:nth-of-type(3)`).css('display', 'flex');
			$(`li:nth-of-type(3)`).css('flex-direction', 'column');
			$(`li:nth-of-type(3)`).css('align-items', 'center');
		} else if (carousel === 2) {
			carousel = 1;
			$(`li:nth-of-type(2)`).css('display', 'none'),
			$(`li:nth-of-type(1)`).css('display', 'flex');
			$(`li:nth-of-type(1)`).css('flex-direction', 'column');
			$(`li:nth-of-type(1)`).css('align-items', 'center');
		} else if (carousel === 3) {
			carousel = 2;
			$(`li:nth-of-type(3)`).css('display', 'none'),
			$(`li:nth-of-type(2)`).css('display', 'flex');
			$(`li:nth-of-type(2)`).css('flex-direction', 'column');
			$(`li:nth-of-type(2)`).css('align-items', 'center');
		}
	} else if (x < 1023) {
         if (carousel === 1) {
			carousel = 3;
			$(`li:nth-of-type(1)`).css('display', 'none'),
			$(`li:nth-of-type(2)`).css('display', 'flex');
			$(`li:nth-of-type(2)`).css('flex-direction', 'column');
			$(`li:nth-of-type(2)`).css('align-items', 'center');
			$(`li:nth-of-type(3)`).css('grid-column', '1 / 2');
			$(`li:nth-of-type(2)`).css('grid-column', '2 / 3');
			$(`li:nth-of-type(2)`).css('grid-row', '1 / 2');
			$(`li:nth-of-type(3)`).css('grid-row', '1 / 2');
		} else if (carousel === 2) {
			carousel = 1;
			$(`li:nth-of-type(2)`).css('display', 'none');
			$(`li:nth-of-type(3)`).css('display', 'flex');
			$(`li:nth-of-type(3)`).css('flex-direction', 'column');
			$(`li:nth-of-type(3)`).css('align-items', 'center');
			$(`li:nth-of-type(1)`).css('grid-column', '1 / 2');
			$(`li:nth-of-type(3)`).css('grid-column', '2 / 3');
			$(`li:nth-of-type(1)`).css('grid-row', '1 / 2');
			$(`li:nth-of-type(3)`).css('grid-row', '1 / 2');
		} else if (carousel === 3) {
			carousel = 2;
			$(`li:nth-of-type(3)`).css('display', 'none'),
			$(`li:nth-of-type(1)`).css('display', 'flex');
			$(`li:nth-of-type(1)`).css('flex-direction', 'column');
			$(`li:nth-of-type(1)`).css('align-items', 'center');
			$(`li:nth-of-type(2)`).css('grid-column', '1 / 2');
			$(`li:nth-of-type(1)`).css('grid-column', '2 / 3');
			$(`li:nth-of-type(2)`).css('grid-row', '1 / 2');
			$(`li:nth-of-type(1)`).css('grid-row', '1 / 2');
		}
	} else {
        if (carousel === 1) {
            carousel = 2
            $(`li:nth-of-type(1)`).css('grid-column', '3 / 4');
            $(`li:nth-of-type(2)`).css('grid-column', '1 / 2');
            $(`li:nth-of-type(3)`).css('grid-column', '2 / 3');
        } else if (carousel === 2) {
            carousel = 3;
			$(`li:nth-of-type(1)`).css('grid-column', '2 / 3');
			$(`li:nth-of-type(2)`).css('grid-column', '3 / 4');
			$(`li:nth-of-type(3)`).css('grid-column', '1 / 2');
        } else if (carousel === 3) {
            carousel = 1;
			$(`li:nth-of-type(1)`).css('grid-column', '1 / 2');
			$(`li:nth-of-type(2)`).css('grid-column', '2 / 3');
			$(`li:nth-of-type(3)`).css('grid-column', '3 / 4');
        }
	}
    
})
$('.nextCara').on('click', () => {
    let x = screen.width;
    if (x < 500) {
        if (carousel === 1) {
            carousel = 2;
            $(`li:nth-of-type(1)`).css('display', 'none'),
		    $(`li:nth-of-type(2)`).css('display', 'flex');
		    $(`li:nth-of-type(2)`).css('flex-direction', 'column');
		    $(`li:nth-of-type(2)`).css('align-items', 'center');
	    } else if (carousel === 2) {
            carousel = 3;
            $(`li:nth-of-type(2)`).css('display', 'none');
		    $(`li:nth-of-type(3)`).css('display', 'flex');
		    $(`li:nth-of-type(3)`).css('flex-direction', 'column');
		    $(`li:nth-of-type(3)`).css('align-items', 'center');
	    } else if (carousel === 3) {
            carousel = 1;
            $(`li:nth-of-type(3)`).css('display', 'none'),
		    $(`li:nth-of-type(1)`).css('display', 'flex');
		    $(`li:nth-of-type(1)`).css('flex-direction', 'column');
		    $(`li:nth-of-type(1)`).css('align-items', 'center');
        }
    } else if (x < 1023) {
        if (carousel === 1) {
			carousel = 2;
			$(`li:nth-of-type(3)`).css('display', 'none'),
			$(`li:nth-of-type(2)`).css('display', 'flex');
			$(`li:nth-of-type(2)`).css('flex-direction', 'column');
            $(`li:nth-of-type(2)`).css('align-items', 'center');
            $(`li:nth-of-type(2)`).css('grid-column', '1 / 2');
            $(`li:nth-of-type(1)`).css('grid-column', '2 / 3');
            $(`li:nth-of-type(2)`).css('grid-row', '1 / 2');
			$(`li:nth-of-type(1)`).css('grid-row', '1 / 2');
		} else if (carousel === 2) {
			carousel = 3;
			$(`li:nth-of-type(1)`).css('display', 'none');
			$(`li:nth-of-type(3)`).css('display', 'flex');
			$(`li:nth-of-type(3)`).css('flex-direction', 'column');
            $(`li:nth-of-type(3)`).css('align-items', 'center');
            $(`li:nth-of-type(3)`).css('grid-column', '1 / 2');
            $(`li:nth-of-type(2)`).css('grid-column', '2 / 3');
            $(`li:nth-of-type(2)`).css('grid-row', '1 / 2');
			$(`li:nth-of-type(3)`).css('grid-row', '1 / 2');
		} else if (carousel === 3) {
			carousel = 1;
			$(`li:nth-of-type(2)`).css('display', 'none'),
			$(`li:nth-of-type(1)`).css('display', 'flex');
			$(`li:nth-of-type(1)`).css('flex-direction', 'column');
            $(`li:nth-of-type(1)`).css('align-items', 'center');
            $(`li:nth-of-type(1)`).css('grid-column', '1 / 2');
            $(`li:nth-of-type(3)`).css('grid-column', '2 / 3');
            $(`li:nth-of-type(3)`).css('grid-row', '1 / 2');
			$(`li:nth-of-type(1)`).css('grid-row', '1 / 2');
		}
    } else {
        if (carousel === 1) {
			carousel = 3;
			$(`li:nth-of-type(1)`).css('grid-column', '2 / 3');
			$(`li:nth-of-type(2)`).css('grid-column', '3 / 4');
			$(`li:nth-of-type(3)`).css('grid-column', '1 / 2');
		} else if (carousel === 2) {
			carousel = 1;
			$(`li:nth-of-type(1)`).css('grid-column', '1 / 2');
			$(`li:nth-of-type(2)`).css('grid-column', '2 / 3');
			$(`li:nth-of-type(3)`).css('grid-column', '3 / 4');
		} else if (carousel === 3) {
			carousel = 2;
			$(`li:nth-of-type(1)`).css('grid-column', '3 / 4');
			$(`li:nth-of-type(2)`).css('grid-column', '1 / 2');
			$(`li:nth-of-type(3)`).css('grid-column', '2 / 3');
		}
    }
});

// Input Email
$('form').on('submit', (event) => {
    event.preventDefault()
})

//How to fix a bug 2.0
const screenCheck = [0, 0, 0]
const screenWidth = screen.width
const screenWidthSettings = () => {
    if (screenWidth > 1023) {
        screenCheck[0] = 1
    } else if (screenWidth > 499) {
        screenCheck[1] = 1
    } else {
        screenCheck[2] = 1
    }
}
screenWidthSettings();

window.addEventListener('resize', () => {
    let x = screen.width;
    if (x > 1023 && screenCheck[0] === 0) {
        location.reload()
    } else if (x > 499 && x < 1024 && screenCheck[1] === 0) {
        location.reload();
    } else if (x < 500 && screenCheck[2] === 0){
        location.reload();
    }
})