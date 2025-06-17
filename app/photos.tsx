const unsplashLink = (id: string) => `/sponsors/${id}`;

const unsplashPhotos = [
  { id: "beaugendre.jpg", width: 100, height: 100 },
  { id: "bouchard.jpg", width: 100, height: 100 },
  { id: "bouetard.jpg", width: 100, height: 100 },
  { id: "breizhsports.jpg", width: 100, height: 100 },
  { id: "brittany_classic_cars.jpg", width: 100, height: 100 },
  { id: "burger_king.jpg", width: 100, height: 100 },
  { id: "cap_a_l_ouest.jpg", width: 100, height: 100 },
  { id: "chanson.jpg", width: 100, height: 100 },
  { id: "collet_yann.jpg", width: 100, height: 100 },
  { id: "comite_35.jpg", width: 100, height: 100 },
  { id: "cornillet.jpg", width: 100, height: 100 },
  { id: "gcp.jpg", width: 100, height: 100 },
  { id: "generali.jpg", width: 100, height: 100 },
  { id: "guinde.jpg", width: 100, height: 100 },
  { id: "l_immobiliere_d_entreprise.jpg", width: 100, height: 100 },
  { id: "la_befana.jpg", width: 100, height: 100 },
  { id: "laine.jpg", width: 100, height: 100 },
  { id: "le_partage.jpg", width: 100, height: 100 },
  { id: "le_triskell.jpg", width: 100, height: 100 },
  { id: "noyal_chatillon.jpg", width: 100, height: 100 },
  { id: "ocopa.jpg", width: 100, height: 100 },
  { id: "ordynamik.jpg", width: 100, height: 100 },
  { id: "poussel.jpg", width: 100, height: 100 },
  { id: "sma2r.jpg", width: 100, height: 100 },
  { id: "someval.jpg", width: 100, height: 100 },
  { id: "superu.jpg", width: 100, height: 100 },
  { id: "tylia.jpg", width: 100, height: 100 },
  { id: "un_autre_regard.jpg", width: 100, height: 100 },
  { id: "we_clean.jpg", width: 100, height: 100 },
];

const photos = unsplashPhotos.map((photo) => ({
  src: unsplashLink(photo.id),
  width: photo.width,
  height: photo.height
}));

export default photos;