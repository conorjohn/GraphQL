const videoA = {
  id: 'a',
  title: 'Create a GraphQL Schema',
  duration: 120,
  // actors:['Christian Bale', 'Scarlett Johanson', 'Robert Downey Jr.'],
  watched: true
};

const videoB = {
  id: 'b',
  title: 'Angular CLI',
  duration: 240,
  // actors:['Ewan McGregor', 'Natalie Portman', 'Chris Hemsworth'],
  watched: false
};

const videos = [videoA, videoB];
const getVideos = () => new Promise((resolve) => resolve(videos));

const getVideoById = (id) => new Promise((resolve) => {
	const [video] = videos.filter((video) => {
		return video.id === id;
	});

	resolve(video);
});

const createVideo = ({ title, duration, released }) => {
	const video = {
		id: (new Buffer(title, 'utf8')).toString('base64'),
		title,
		duration,
		released,
	};

	videos.push(video);
	
	return video;
};

const getObjectById = (type, id) => {
	const types = {
		video: getVideoById,
	};

	return types[type](id);
}

exports.createVideo	= createVideo;
exports.getVideoById = getVideoById;
exports.getVideos = getVideos;
exports.getObjectById = getObjectById;