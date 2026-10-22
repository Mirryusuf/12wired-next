export type Event = {
  slug: string;
  dayLabel: string;
  dateLabel: string;
  title: string;
  venue: string;
  city: string;
  schedule: string;
  address: string;
  description?: string[];
};

/** Order matches the original "UPCOMING TOURS" list (newest first). */
export const events: Event[] = [
  {
    slug: "mario-zwinkle-at-megaport-festival-kaohsiung-taiwan",
    dayLabel: "Sab",
    dateLabel: "29 Mar",
    title: "Mario Zwinkle at Megaport Festival, Kaohsiung, Taiwan",
    venue: "",
    city: "Kaohsiung City, Taiwan",
    schedule: "29 Mar 2025, 19.00 – 23.00 GMT+8",
    address: "Kaohsiung City, Taiwan",
    description: [
      "Mario Zwinkle is set to make his second international performance in Taiwan. He will be heading to Kaohsiung for Megaport Festival 2025 on Saturday, March 29.",
    ],
  },
  {
    slug: "mario-zwinkle-at-bangkok-music-city-bangkok-thailand",
    dayLabel: "Sab",
    dateLabel: "01 Mar",
    title: "Mario Zwinkle at Bangkok Music City, Bangkok, Thailand",
    venue: "Keep Walking Music Space",
    city: "Bangkok, Thailand",
    schedule: "01 Mar 2025, 21.45 GMT+7 – 02 Mar 2025, 22.15 GMT+7",
    address:
      "Keep Walking Music Space, Charoenkrung Khwaeng Bang Rak, Khet Bang Rak, Krung Thep Maha Nakhon 10500, Thailand",
    description: [
      "Mario Zwinkle is set to make his long-awaited international debut with performances in Thailand.",
      "Mario will take the stage at Bangkok Music City 2025 in Bangkok, Thailand, on Saturday, March 1.",
    ],
  },
  {
    slug: "eleanor-whisper-heylo-jeylo-at-bolehgigs-wangsa-timoer",
    dayLabel: "Kam",
    dateLabel: "27 Feb",
    title: "Eleanor Whisper & Heylo Jeylo at BolehGigs, Wangsa Timoer",
    venue: "Wangsa Timoer",
    city: "Kota Jakarta Selatan",
    schedule: "27 Feb 2025, 19.00 – 23.00",
    address:
      "Kota Jakarta Selatan, Jl. RS. Fatmawati Raya No.47, Pulo, Kec. Kby. Baru, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12160, Indonesia",
    description: [
      "Eleanor Whisper & Heylo Jeylo will joining Ninety Horsepower as line up at this edition of Boleh Gigs.",
    ],
  },
  {
    slug: "heylo-jeylo-at-riuhria-wapres-bulungan",
    dayLabel: "Rab",
    dateLabel: "19 Feb",
    title: "Heylo Jeylo at RiuhRia - Wapres, Bulungan",
    venue: "Wapres, Bulungan",
    city: "Kota Jakarta Selatan",
    schedule: "19 Feb 2025, 19.00 – 23.00",
    address:
      "Kota Jakarta Selatan, Jl. Bulungan Blk. C No.1, RT.11/RW.7, Kramat Pela, Kec. Kby. Baru, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12130, Indonesia",
  },
  {
    slug: "mario-zwinkle-suisei-annisya-open-garage-vol-03-krapela",
    dayLabel: "Min",
    dateLabel: "16 Feb",
    title: "Mario Zwinkle, Suisei & Annisya @ Open Garage vol.03, Krapela",
    venue: "Krapela",
    city: "Kota Jakarta Selatan",
    schedule: "16 Feb 2025, 20.00 – 23.30",
    address:
      "Kota Jakarta Selatan, ROW, Jl. Bulungan No.9 9 LT.5, Kramat Pela, Kec. Kby. Baru, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12130, Indonesia",
    description: [
      "Open Garage vol.03 featuring Mario Zwinkle, Suisei, Annisya, Syeqy & Tat Mannerz.",
    ],
  },
  {
    slug: "tripov-at-kereta-seni-v-fisip-ui",
    dayLabel: "Jum",
    dateLabel: "14 Feb",
    title: "Tripov at Kereta Seni V: FISIP UI",
    venue: "FISIP UI",
    city: "Kota Depok",
    schedule: "14 Feb 2025, 19.30 – 22.30",
    address:
      "Kota Depok, Universitas Indonesia, Fakultas Ilmu Sosial dan Ilmu Politik (FISIP UI), Jl. Prof. DR. Selo Soemardjan, Pondok Cina, Kecamatan Beji, Kota Depok, Jawa Barat, Indonesia",
    description: [
      "Tripov will perform at Kereta Seni V, one of the flagship programs of the Arts and Culture Department of BEM FISIP UI 2024, presented in the form of an art festival.",
    ],
  },
  {
    slug: "caecillia-at-aquarius-nite-t-space-bintaro",
    dayLabel: "Kam",
    dateLabel: "13 Feb",
    title: "Caecillia at Aquarius Nite, T-Space, Bintaro",
    venue: "T-Space, Bintaro",
    city: "Kota Tangerang Selatan",
    schedule: "13 Feb 2025, 19.00 – 23.00",
    address:
      "Kota Tangerang Selatan, Jl. Jombang Raya No.32, Parigi, Jombang, Kota Tangerang Selatan, Banten 15229, Indonesia",
    description: [
      "Caecillia will join fellow Aquarians to perform at the special edition of Jajal Panggung at T-Space, Bintaro.",
    ],
  },
  {
    slug: "heylo-jeylo-at-mic-check-vol-04",
    dayLabel: "Sab",
    dateLabel: "25 Jan",
    title: "Heylo Jeylo at Mic Check vol.04",
    venue: "Mic Check vol.04",
    city: "Kota Jakarta Selatan",
    schedule: "25 Jan 2025, 13.00 – 21.00",
    address:
      "Kota Jakarta Selatan, Jl. Birah Raya No.10, RT.5/RW.6, Kec. Kby. Baru, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12180, Indonesia",
    description: [
      "Heylo Jeylo will perform at Mic Check Vol. 04 alongside other independent bands such as The Stroots, Blum, Ninety Horsepower, and OM Lawan.",
      "Catch Heylo Jeylo at 3:00 PM!",
    ],
  },
];

export function getEvent(slug: string) {
  return events.find((e) => e.slug === slug);
}
