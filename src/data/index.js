const videoA = {
  id: 'a',
  title: 'Create a GraphQL Schema',
  duration: 120,
  actors:['Christian Bale', 'Scarlett Johanson', 'Robert Downey Jr.'],
  watched: true
};

const videoB = {
  id: 'b',
  title: 'Angular CLI',
  duration: 240,
  actors:['Ewan McGregor', 'Natalie Portman', 'Chris Hemsworth'],
  watched: false
};

const videos = [videoA, videoB];

const getVideoById = (id) => new Promise((resolve) => {
	const [video] = videos.filter((video) => {
		return video.id === id;
	});

	resolve(video);
});

exports.getVideoById = getVideoById;