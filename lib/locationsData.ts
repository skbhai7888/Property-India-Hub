export interface LocationInfo {
  slug: string;
  name: string;
  state: string;
  matchKeywords: string[];
  overview: string;
  connectivity: string;
  infrastructure: string;
  faqs: { q: string; a: string }[];
}

export const locations: LocationInfo[] = [
  {
    slug: "noida",
    name: "Noida",
    state: "Uttar Pradesh",
    matchKeywords: ["noida"],
    overview: "Noida is a planned city in Gautam Buddh Nagar district, Uttar Pradesh, and one of the most established parts of the National Capital Region (NCR). It is known for its wide sector-based layout, IT/business parks, and a mix of residential apartments, plots, and commercial spaces.",
    connectivity: "Noida is connected to Delhi via the DND Flyway and multiple direct roads, and to Greater Noida via the Noida-Greater Noida Expressway. The Delhi Metro Blue Line and Aqua Line serve several sectors. The newly operational Noida International Airport at Jewar has further improved long-term connectivity for the region.",
    infrastructure: "Noida has established social infrastructure including schools, hospitals, and shopping centres across its sectors, along with ongoing metro and road expansion projects connecting it more closely with Greater Noida and the Yamuna Expressway belt.",
    faqs: [
      { q: "Is Noida part of NCR?", a: "Yes, Noida is one of the key cities within the National Capital Region (NCR), located in Gautam Buddh Nagar district, Uttar Pradesh." },
      { q: "How is Noida connected to Delhi?", a: "Noida connects to Delhi via the DND Flyway, several direct roads, and the Delhi Metro Blue Line and Aqua Line." },
    ],
  },
  {
    slug: "greater-noida",
    name: "Greater Noida",
    state: "Uttar Pradesh",
    matchKeywords: ["greater noida"],
    overview: "Greater Noida is a planned satellite city adjoining Noida, developed along the Yamuna Expressway and Noida-Greater Noida Expressway corridors. It is home to the Buddh International Circuit, several universities, and a growing number of residential and plotted-development projects.",
    connectivity: "Greater Noida is linked to Noida and Delhi via the Noida-Greater Noida Expressway and to Agra via the Yamuna Expressway. The Aqua Line metro serves parts of the city, and it lies within reasonable driving distance of the newly operational Noida International Airport at Jewar.",
    infrastructure: "The area has seen continuous development of educational institutions, industrial areas (including sections of the Delhi-Mumbai Industrial Corridor), and residential sectors, with further growth expected due to its proximity to Jewar Airport and the proposed Noida International Film City.",
    faqs: [
      { q: "How far is Greater Noida from Jewar Airport?", a: "Greater Noida lies along the Yamuna Expressway corridor, within comfortable driving distance of the newly operational Noida International Airport at Jewar." },
      { q: "What is Greater Noida known for?", a: "Greater Noida is known for planned residential sectors, the Buddh International Circuit, several universities, and its location along the Yamuna Expressway." },
    ],
  },
  {
    slug: "jewar",
    name: "Jewar (Yamuna Expressway)",
    state: "Uttar Pradesh",
    matchKeywords: ["jewar", "yamuna expressway"],
    overview: "Jewar, in Gautam Buddh Nagar district, is now home to the Noida International Airport, inaugurated in March 2026. The surrounding Yamuna Expressway belt has become one of the most closely watched investment corridors in the NCR region following the airport's development.",
    connectivity: "The area is served directly by the Yamuna Expressway, connecting it to Greater Noida, Noida, and Agra. With the Noida International Airport now operational, the region has significantly improved air connectivity alongside its existing road links.",
    infrastructure: "Beyond the airport itself, the region has planned projects including the proposed Noida International Film City near Sector 21 along the Yamuna Expressway, expected to add further commercial and residential demand over time.",
    faqs: [
      { q: "Has Jewar Airport opened?", a: "Yes, the Noida International Airport at Jewar was inaugurated in March 2026, becoming a major aviation hub for the NCR region." },
      { q: "Why is Jewar attracting real estate interest?", a: "Jewar's growing appeal is linked to the newly operational international airport and planned projects such as the Noida International Film City along the Yamuna Expressway." },
    ],
  },
  {
    slug: "ghaziabad",
    name: "Ghaziabad",
    state: "Uttar Pradesh",
    matchKeywords: ["ghaziabad"],
    overview: "Ghaziabad is a major NCR city in Uttar Pradesh, bordering East Delhi, known for its established residential neighbourhoods, industrial areas, and ongoing infrastructure upgrades along the Delhi-Meerut corridor.",
    connectivity: "Ghaziabad is connected to Delhi via NH9, the Delhi Meerut Expressway, and the Delhi Metro Red Line, along with the Namo Bharat (RRTS) corridor connecting it further along the Meerut route.",
    infrastructure: "The city has a mix of established and newer residential sectors, commercial markets, schools, and hospitals, with continued development along the Delhi-Meerut Expressway corridor.",
    faqs: [
      { q: "Is Ghaziabad connected by metro?", a: "Yes, Ghaziabad is served by the Delhi Metro Red Line, and parts of the city also connect to the Namo Bharat (RRTS) corridor." },
      { q: "What connects Ghaziabad to Delhi?", a: "Ghaziabad connects to Delhi via NH9 and the Delhi Meerut Expressway, in addition to metro rail." },
    ],
  },
  {
    slug: "mathura",
    name: "Mathura",
    state: "Uttar Pradesh",
    matchKeywords: ["mathura"],
    overview: "Mathura is a historic pilgrimage city in Uttar Pradesh on the banks of the river Yamuna, known as the birthplace of Lord Krishna. It draws steady religious tourism through the year, which supports demand for residential, hospitality, and commercial real estate.",
    connectivity: "Mathura lies along NH19 (Delhi-Agra corridor) and the Yamuna Expressway, offering direct road access to Delhi, Noida, Greater Noida, and Agra. It also has its own railway junction with frequent train services.",
    infrastructure: "The town has expanding infrastructure to support pilgrimage tourism alongside residential development, with ongoing road and civic improvements connecting it to nearby Vrindavan.",
    faqs: [
      { q: "How is Mathura connected to Delhi and Agra?", a: "Mathura is connected via NH19 (Delhi-Agra highway) and the Yamuna Expressway, along with regular train services." },
      { q: "Why is Mathura a growing real estate market?", a: "Mathura's year-round pilgrimage tourism, tied to its religious significance, supports steady demand for residential and hospitality property." },
    ],
  },
  {
    slug: "vrindavan",
    name: "Vrindavan",
    state: "Uttar Pradesh",
    matchKeywords: ["vrindavan"],
    overview: "Vrindavan, adjoining Mathura in Uttar Pradesh, is one of India's most significant pilgrimage destinations associated with Lord Krishna. It sees large numbers of visitors and devotees throughout the year, driving demand for residential and hospitality-linked property.",
    connectivity: "Vrindavan is closely linked to Mathura and accessible via NH19 and the Yamuna Expressway, with the nearest major railway junction at Mathura.",
    infrastructure: "The town continues to see development of ashrams, guesthouses, residential complexes, and civic infrastructure to support its growing pilgrim footfall.",
    faqs: [
      { q: "Is Vrindavan close to Mathura?", a: "Yes, Vrindavan is a short distance from Mathura and both are typically visited together by pilgrims and tourists." },
      { q: "What drives property demand in Vrindavan?", a: "Vrindavan's status as a major pilgrimage site drives consistent demand for residential, ashram, and hospitality-related real estate." },
    ],
  },
  {
    slug: "ayodhya",
    name: "Ayodhya",
    state: "Uttar Pradesh",
    matchKeywords: ["ayodhya"],
    overview: "Ayodhya, on the banks of the river Saryu in Uttar Pradesh, is a major pilgrimage city associated with Lord Ram. Following the Ram Mandir consecration and the development of the Maharishi Valmiki International Airport, the city has seen a significant rise in tourism and real estate interest.",
    connectivity: "Ayodhya has its own airport (Maharishi Valmiki International Airport) with domestic flight connectivity, alongside a well-connected railway station and road links via national highways.",
    infrastructure: "The city has undergone considerable infrastructure development in recent years, including road widening, new hotels, and civic upgrades to support the sharp rise in visitor numbers.",
    faqs: [
      { q: "Does Ayodhya have an airport?", a: "Yes, Ayodhya is served by the Maharishi Valmiki International Airport, which has improved direct connectivity to the city." },
      { q: "Why has Ayodhya real estate demand grown?", a: "Demand has grown alongside a sharp rise in pilgrim and tourist visits following the Ram Mandir consecration and new infrastructure development." },
    ],
  },
  {
    slug: "khatu-shyam",
    name: "Khatu Shyam",
    state: "Rajasthan",
    matchKeywords: ["khatu shyam", "khatu"],
    overview: "Khatu Shyam, in Sikar district, Rajasthan, is home to the widely revered Khatu Shyamji temple and draws large numbers of devotees throughout the year, particularly during major fair periods.",
    connectivity: "Khatu Shyam is accessible by road from Jaipur and other parts of Rajasthan and NCR, with the nearest major railway stations located in the surrounding Sikar district.",
    infrastructure: "The town has infrastructure geared largely towards pilgrimage tourism, including guesthouses and hospitality establishments serving the steady flow of devotees.",
    faqs: [
      { q: "Which district is Khatu Shyam in?", a: "Khatu Shyam is located in Sikar district, Rajasthan." },
      { q: "Why does Khatu Shyam attract property interest?", a: "Its year-round pilgrimage traffic to the Khatu Shyamji temple supports demand for hospitality and residential property in the area." },
    ],
  },
  {
    slug: "behror",
    name: "Behror",
    state: "Rajasthan",
    matchKeywords: ["behror"],
    overview: "Behror is a town in Alwar district, Rajasthan, situated along National Highway 48 (the Delhi-Jaipur highway) and within the broader Delhi-Mumbai Industrial Corridor (DMIC) region, close to the Neemrana industrial belt.",
    connectivity: "Behror has direct access to NH48, connecting it to both Delhi and Jaipur, making it a convenient stop and a growing residential and industrial location along this corridor.",
    infrastructure: "The wider Neemrana-Behror belt has seen industrial and logistics investment linked to the Delhi-Mumbai Industrial Corridor, which has supported growing residential interest in the area.",
    faqs: [
      { q: "Which highway passes through Behror?", a: "Behror lies on National Highway 48, the main Delhi-Jaipur highway." },
      { q: "Why is Behror seeing real estate growth?", a: "Behror's location within the Delhi-Mumbai Industrial Corridor region, near the Neemrana industrial belt, has supported both industrial and residential growth." },
    ],
  },
  {
    slug: "garhmukteshwar",
    name: "Garhmukteshwar",
    state: "Uttar Pradesh",
    matchKeywords: ["garhmukteshwar", "garh mukteshwar"],
    overview: "Garhmukteshwar, in Hapur district, Uttar Pradesh, sits on the banks of the river Ganga and is known both as a pilgrimage site and as a popular weekend destination for NCR residents, with growing interest in farmhouse and riverside plotted developments.",
    connectivity: "Garhmukteshwar is connected to Delhi and Ghaziabad via NH9, making it accessible as a weekend getaway from the NCR region.",
    infrastructure: "The area has seen a rise in resort-style and farmhouse developments catering to weekend visitors from Delhi-NCR, alongside its traditional role as a pilgrimage town.",
    faqs: [
      { q: "How far is Garhmukteshwar from Delhi?", a: "Garhmukteshwar is connected to Delhi and Ghaziabad via NH9, making it a popular weekend getaway destination from NCR." },
      { q: "What type of property is common in Garhmukteshwar?", a: "The area has a growing number of farmhouse and riverside plotted developments alongside its traditional pilgrimage-linked properties." },
    ],
  },
  {
    slug: "jageshwar-dham",
    name: "Jageshwar Dham",
    state: "Uttarakhand",
    matchKeywords: ["jageshwar"],
    overview: "Jageshwar Dham, in Almora district, Uttarakhand, is home to an ancient cluster of Hindu temples dedicated to Lord Shiva, set amid Himalayan deodar forests. It is a significant pilgrimage and heritage tourism destination in the Kumaon region.",
    connectivity: "Jageshwar is accessible by road from Almora and other parts of the Kumaon hills, with the nearest railway connections available at Kathgodam.",
    infrastructure: "The area primarily supports pilgrimage and heritage tourism, with a growing number of homestays and small hospitality developments catering to visitors seeking hill properties.",
    faqs: [
      { q: "Where is Jageshwar Dham located?", a: "Jageshwar Dham is located in Almora district, Uttarakhand, in the Kumaon Himalayan region." },
      { q: "What is Jageshwar Dham known for?", a: "It is known for its ancient cluster of Shiva temples set among deodar forests, making it a major pilgrimage and heritage site." },
    ],
  },
];

export function getLocationBySlug(slug: string) {
  return locations.find((l) => l.slug === slug);
}
