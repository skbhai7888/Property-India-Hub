const fs = require('fs');
const file = 'app/projects/[slug]/page.tsx';
let content = fs.readFileSync(file, 'utf8');

const oldConst = `const videoEmbed = getYouTubeEmbed(project.video_url);`;
const newConst = `const videoEmbed = project.video_url || "";`;

if (content.includes(oldConst)) {
  content = content.replace(oldConst, newConst);
  console.log("videoEmbed const updated OK");
} else {
  console.log("WARNING: videoEmbed const not found");
}

const oldIframe = `<iframe src={videoEmbed} className="w-full h-full" allowFullScreen title="Project Video" />`;
const newVideo = `<video src={videoEmbed} controls className="w-full h-full object-contain bg-black" />`;

if (content.includes(oldIframe)) {
  content = content.replace(oldIframe, newVideo);
  console.log("video tag updated OK");
} else {
  console.log("WARNING: iframe pattern not found");
}

fs.writeFileSync(file, content);
console.log("DONE - file saved");
