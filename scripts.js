// My Google spreadsheet link
// https://spreadsheets.google.com/feeds/list/1Gy2RhQ_KJXX7U8FUJi-GXtvBNQlWTj140rriT0dlnDY/od6/public/values?alt=json


// So I can see the array
// const createArr = (projectsArr) => {
//     console.log(projectsArr)
// }

const addProject2Index = (projectsArr) => {
	let i = 0;
	while (i < projectsArr.length) {
		let title = projectsArr[i].title;
        $('.projectList').append('<li>' + title + '</li>');
        let $img = $('<img>');
        $img.attr('src', projectsArr[i].image)
        $('.projectList').append($img);
		i++;
	}
};

$.ajax({
	url: "https://spreadsheets.google.com/feeds/list/1Gy2RhQ_KJXX7U8FUJi-GXtvBNQlWTj140rriT0dlnDY/od6/public/values?alt=json",
}).then( sheet => {
        // so I can play find the path
        // console.log(sheet)
        // following the Joe's repo to do this
        const projects = sheet.feed.entry.map(projects =>{
            return {
                title: projects.gsx$title.$t,
                link: projects.gsx$link.$t,
                description: projects.gsx$description.$t,
                image: projects.gsx$image.$t
            }
        })

        // createArr(projects)
        addProject2Index(projects);
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