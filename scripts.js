// My Google spreadsheet link
// https://spreadsheets.google.com/feeds/list/1Gy2RhQ_KJXX7U8FUJi-GXtvBNQlWTj140rriT0dlnDY/od6/public/values?alt=json


// So I can see the array
const viewArr = (array) => {
    console.log(array)
}

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
		$(`li:nth-of-type(${n})`).append('<header>' + title + '</header>');
		let $img = $('<img>');
		$img.attr('src', projectsArr[i].image);
        $(`li:nth-of-type(${n})`).append($img);
        //don't need this now or ever leaving for reference
		// $($img).on('click', () => {
		//     window.location = projectsArr[i].link
        // })
        // Got this working!!!!!!!!!!
        let link = projectsArr[i].link;
		$(`li:nth-of-type(${n})`).append(`<a href="${link}">Go to Site</a>`);
		i++;
	}
};

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

// w3schools format decided to go with it.
$('i').on('click', () => {
    let menu = document.getElementById("navLinks")
    if (menu.style.display === "flex") {
        menu.style.display = "none"
    } else {
        menu.style.display = "flex"
    }
});
// Wanted a little more functionality for the nav button
$('a').on('click', () => {
    let menu = document.getElementById("navLinks")
    menu.style.display = "none"
})

// viewArr(googleArr);