const unsplashLink = (id: string) => `/chrono24h/sponsors/${id}`;

const unsplashPhotos = [
  { id: "ads.jpg", width: 100, height: 100 },
  { id: "acp-immo.png", width: 100, height: 100 },
  { id: "art-line.png", width: 100, height: 100 },
  { id: "beaugendre.png", width: 100, height: 100 },
  { id: "bouchard.png", width: 100, height: 100 },
  { id: "bouetard.png", width: 100, height: 100 },
  { id: "breizh-sports.png", width: 100, height: 100 },
  { id: "brittany-classic-cars.png", width: 100, height: 100 },
  { id: "burger-king.png", width: 100, height: 100 },
  { id: "castel-auto.png", width: 100, height: 100 },
  { id: "charact-hair.png", width: 100, height: 100 },  
  { id: "cimm.png", width: 100, height: 100 },
  { id: "comite-35.jpg", width: 100, height: 100 },
  { id: "collet.png", width: 100, height: 100 },
  { id: "fun-lab.png", width: 100, height: 100 },
  { id: "gcp.png", width: 100, height: 100 },
  { id: "glet.png", width: 100, height: 100 },
  { id: "la-befana.png", width: 100, height: 100 },
  { id: "le-flyse.png", width: 100, height: 100 },
  { id: "le-partage.png", width: 100, height: 100 },
  { id: "le-triskell.png", width: 100, height: 100 },
  { id: "noyal-chatillon.jpg", width: 100, height: 100 },
  { id: "lysadis.png", width: 100, height: 100 },
  { id: "ordynamik.png", width: 100, height: 100 },
  { id: "pouessel.png", width: 100, height: 100 },
  { id: "rennes-clair.png", width: 100, height: 100 },
  { id: "super-u.png", width: 100, height: 100 },
  { id: "tylia.jpg", width: 100, height: 100 },
  { id: "un-autre-regard.png", width: 100, height: 100 },
  { id: "we-clean.png", width: 100, height: 100 },
];

const photos = unsplashPhotos.map((photo) => ({
  src: unsplashLink(photo.id),
  width: photo.width,
  height: photo.height
}));

export default photos;