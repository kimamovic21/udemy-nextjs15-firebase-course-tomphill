export function imageUrlFormatter(imagePath: string) {
  return `https://firebasestorage.googleapis.com/v0/b/udemy-fire-homes-project.firebasestorage.app/o/${encodeURIComponent(imagePath)}?alt=media`
};