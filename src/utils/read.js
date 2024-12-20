function calculateReadingTime(post) {
  const words = post.split(" ");
  const wordCount = words.length;
  const readingTime = Math.round(wordCount / 100);
  return readingTime;
}

module.exports = { calculateReadingTime };