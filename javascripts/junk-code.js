// This was moved here to preserve comments that are no longer relevant but still want to know context
const addProject2Index = (projectsArr) => {
	let i = 0;
	while (i < projectsArr.length) {
		// while (i < projectsArr.length) {
		$('.projectList').append('<li>' + '</li>');
		let n = i + 1;
		let title = projectsArr[i].title;
		$(`li:nth-of-type(${n})`).append('<header>' + title + '</header>');
		// Final: click on image and go to link
		// Holy Code Batman I got it working
		let link = projectsArr[i].link;
		$(`li:nth-of-type(${n})`).append(`<a href="${link}"></a>`);
		let imgDescription = projectsArr[i].description;
		let $img = $('<img>');
		$img.attr('src', projectsArr[i].image);
		$img.attr('title', imgDescription + ' -Click to go to website');
		$(`li:nth-of-type(${n}) a`).append($img);
		$(`li:nth-of-type(${n})`).append('<footer>This is a footer</footer>');

		// Image
		// let $img = $('<img>');
		// $img.attr('src', projectsArr[i].image);
		// $(`li:nth-of-type(${n})`).append($img);

		//don't need this now or ever leaving for reference
		// $($img).on('click', () => {
		//     window.location = projectsArr[i].link
		// })

		// Got this working!!!!!!!!!!
		// let link = projectsArr[i].link;
		// $(`li:nth-of-type(${n})`).append(`<a href="${link}">Go to Site</a>`);
		i++;
	}
	caraStart();
};
