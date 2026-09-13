# -*- coding: utf-8 -*-
# G05-B — Áp dụng bản dịch EN vào src/data/timeline.json (chạy một lần, giữ bản gốc bằng git).
# Không đổi trường VI; chỉ thêm *_en cạnh trường tương ứng. proves giữ nguyên (hồ sơ nguồn).
import json, io

PATH = 'src/data/timeline.json'
d = json.load(open(PATH, encoding='utf-8'))

# Bản dịch theo slug. alt không lưu ở đây — component ghép title(lang) + đuôi trung tính.
EN = {
 'peter-henlein': dict(
  title='Peter Henlein — the first pocket timepieces',
  desc='From around 1510, in Nuremberg, Peter Henlein is recorded as making small, pocketable timepieces — time left the church tower and began travelling with its owner for the first time. The German national biography (NDB) records this with reservations; the "1510" inscription on the drum watch at the Germanisches Nationalmuseum is still disputed.',
  day='Recorded point in time (approximate)',
  scope='per the German national biography (NDB) and the Germanisches Nationalmuseum (GNM)',
  limit='Dating is uncertain: the "Henlein-Uhr" is now dated by the museum to around 1530; the 1510 inscription is suspected to be a later forgery',
 ),
 'huygens-hairspring': dict(
  title='Huygens — the pendulum clock (1657) and the balance spring (1675)',
  desc='Christiaan Huygens applied the pendulum to the clock (1657), then applied the coiled spring to the balance of the pocket watch (1675). According to the Science Museum, minutes could from then on be indicated reliably in both clocks and watches. Credit for the balance spring was strongly contested by Robert Hooke.',
  day='Period — two improvement steps (invention)',
  scope='Science Museum Group (UK) and FHH',
  limit='Credit for the balance spring was disputed by Robert Hooke — the Science Museum describes it as "strongly contested"',
 ),
 'blancpain': dict(
  title='Blancpain sets up a workshop in Villeret',
  desc='In 1735, Jehan-Jacques Blancpain entered his name as a watchmaker in the village register of Villeret. The brand calls itself the oldest watchmaking brand in the world.',
  day='Watchmaker registration (village register)',
  scope='per Blancpain\u2019s records and claims',
  limit='1735 is the year recorded in the village register of Villeret, not a founding contract; "the world\u2019s oldest watch brand" is the maker\u2019s own claim (Vacheron Constantin claims an equivalent title for continuous operation)',
  name={'Blancpain — Métiers d\'Art (thông cáo hãng)': 'Blancpain — Métiers d\'Art (brand press release)'},
 ),
 'vacheron-constantin': dict(
  title='Vacheron opens a workshop in Geneva',
  desc='In 1755, Jean-Marc Vacheron signed the workshop\u2019s first apprenticeship contract — the Maison calls this document its "birth certificate" and claims to be the longest continuously operating manufacture since its founding.',
  day='First apprenticeship contract (recorded point)',
  scope='per Vacheron Constantin\u2019s records and claims',
  limit='"The longest continuously operating manufacture" is the brand\u2019s own claim — Blancpain also claims "the world\u2019s oldest watchmaking brand" in a different sense',
 ),
 'breguet-tourbillon': dict(
  title='Breguet patents the tourbillon',
  desc='Breguet was granted a patent for the tourbillon — a regulator that rotates the whole escapement to average out gravity-induced errors — on 26 June 1801; the idea took shape between 1793 and 1795 while he was staying in Switzerland.',
  day='Patent granted',
  scope='Breguet and Swatch Group records',
 ),
 'breguet-naples': dict(
  title='Breguet makes a wristwatch for the Queen of Naples',
  desc='Queen Caroline Murat of Naples ordered watch No. 2639 from Breguet on 8 June 1810 — delivered in 1812. Per the brand\u2019s records, it is the first watch designed to be worn on the wrist.',
  day='Commission (delivered 1812)',
  scope='per Breguet\u2019s brand records',
  limit='"First" is the wording of the Breguet brand archives ("the first watch designed to be worn on the wrist")',
 ),
 'patek-first-wristwatch': dict(
  title='Patek Philippe makes a wristwatch for Countess Koscowicz',
  desc='Patek Philippe created a wristwatch for Countess Koscowicz of Hungary in 1868 — per the brand, the first Swiss wristwatch; the piece is displayed at the Patek Philippe Museum in Geneva.',
  day='Manufacture',
  scope='per Patek Philippe\u2019s claim',
  limit='"First" is limited to Swiss wristwatches, per the brand\u2019s own page',
  name={'Patek Philippe — The First Wristwatch (mục Bracelets)': 'Patek Philippe — The First Wristwatch (Bracelets section)'},
 ),
 'cartier-santos': dict(
  title='The Cartier Santos is born',
  desc='Louis Cartier made a watch for the aviator Alberto Santos-Dumont (1904) — per the brand, one of the first wristwatches and the first Cartier intended for a man to wear on the wrist; it went on public sale from 1911 (FHH).',
  day='Made to order (on sale 1911)',
  scope='per Cartier and FHH',
  limit='Cartier says "one of the first ever wristwatches" — not "the first"; the 1911 sale date is sourced from FHH, the brand\u2019s page does not state it',
 ),
 'trench-watch': dict(
  title='World War I — the wristwatch spreads through the armies',
  desc='During World War I, soldiers moved from pocket watches to wristwatches so they could read the time with both hands on their weapons; the men\u2019s wristwatch spread — the British War Office even issued wristwatches to soldiers.',
  day='Period (World War I)',
  scope='Science Museum Group (UK)',
  limit='Museum sources describe the wristwatch as proliferating and the pocket watch losing ground in combat — not a complete replacement',
 ),
 'harwood-automatic': dict(
  title='John Harwood — the self-winding mechanism',
  desc='John Harwood filed patent applications for a self-winding mechanism for wristwatches (UK on 7 July 1923, Switzerland on 16 October 1923; the Swiss patent granted in 1924). Series production began on 13 July 1926 at Fortis — recorded as the first mass-produced automatic wristwatch.',
  day='Patent application (series production 1926)',
  scope='patent records, Fortis and Sotheby\u2019s',
  limit='Some popular sources give "production from 1928" — the Fortis records give the launch date as 13 July 1926',
 ),
 'rolex-oyster': dict(
  title='Rolex Oyster — the first waterproof case',
  desc='The Rolex Oyster — per the brand, the first waterproof and dustproof wristwatch, with a hermetically sealed case protecting the movement. In 1927, Mercedes Gleitze swam the English Channel wearing one for more than 10 hours; when she came ashore, the watch was still running perfectly (per Rolex).',
  day='Launch (Gleitze\u2019s Channel swim, 1927)',
  scope='per Rolex',
 ),
 'rolex-perpetual': dict(
  title='Rolex Perpetual — the 360° self-winding rotor',
  desc='The Rolex Perpetual — the brand records inventing and patenting the world\u2019s first self-winding mechanism with a central rotor (1931); per Rolex, this system is today at the heart of every modern automatic watch.',
  day='Launch (patent granted)',
  scope='per Rolex',
  limit='The phrase "at the heart of every modern automatic watch" is Rolex\u2019s own wording',
 ),
 'jlc-reverso': dict(
  title='Jaeger-LeCoultre Reverso',
  desc='The Reverso — a swivelling case that turns the dial away to protect the glass when playing polo; the patent application was filed in Paris on 4 March 1931 (design by René-Alfred Chauvot), and the initial batch reached the market less than nine months later. Distinctive Art Deco styling.',
  day='Patent (application filed 4 March 1931)',
  scope='Jaeger-LeCoultre records',
 ),
 'iwc-pilot': dict(
  title='IWC launches the Pilot\u2019s Watch line',
  desc='The IWC Special Pilot\u2019s Watch (1936) — the brand\u2019s first pilot line: anti-magnetic escapement, shatterproof glass, a rotating bezel with an index for timing short intervals, luminous hands and numerals. IWC counts itself among the pioneers of the pilot\u2019s watch.',
  day='Launch',
  scope='per IWC (Ref. IW436)',
  limit='"Early pioneer" is IWC\u2019s own assessment on the brand\u2019s press pages',
 ),
 'rolex-datejust': dict(
  title='Rolex Datejust — a date window on the dial',
  desc='The Rolex Datejust — per the brand, the first self-winding waterproof chronometer to display the date in a window on the dial (1945).',
  day='Launch',
  scope='per Rolex',
 ),
 'fifty-fathoms': dict(
  title='Blancpain Fifty Fathoms — the first modern dive watch',
  desc='The Blancpain Fifty Fathoms — per the brand, the first modern dive watch, introduced in 1953; a 50-fathom water rating (about 91 m — a unit conversion) and a locked rotating bezel for divers to time their dives.',
  day='Launch',
  scope='per Blancpain',
  limit='The bezel of the first version was locked (it turned only after releasing a catch) — the brand\u2019s sources do not state one-way rotation; 91 m is a unit conversion, not stated in the brand\u2019s sources',
  name={'Lettres du Brassus số 13 — History and legend': 'Lettres du Brassus issue 13 — History and legend'},
 ),
 'rolex-submariner': dict(
  title='Rolex Explorer & Submariner are born',
  desc='The Rolex Explorer launched in 1953 to mark the Everest expedition (the climbing team was equipped with Oyster Perpetual watches); the same year, per Rolex, the Submariner was the first dive watch waterproof to 100 m.',
  day='Launch',
  scope='per Rolex',
  limit='Some external sources give the Submariner\u2019s launch as 1954 — the Rolex history page says "Launched in 1953"',
 ),
 'rolex-gmt': dict(
  title='Rolex GMT-Master — the 24-hour hand',
  desc='The Rolex GMT-Master launched in 1955 with a 24-hour hand and a two-colour bezel separating day from night — designed as a navigational tool for long-haul pilots; it later became the official watch of several airlines, including Pan Am (per Rolex).',
  day='Launch',
  scope='per Rolex',
 ),
 'omega-speedmaster': dict(
  title='The Omega Speedmaster is launched',
  desc='The Omega Speedmaster launched in 1957, alongside the Seamaster 300 and the Railmaster. After NASA qualified it for crewed missions (1965), the Speedmaster became the first watch worn on the Moon (1969) — per Omega.',
  day='Launch (Moon 1969)',
  scope='per Omega; NASA qualification in 1965',
 ),
 'heuer-carrera': dict(
  title='The Heuer Carrera is born',
  desc='The Heuer Carrera launched in 1963 — designed by Jack Heuer and named after the Carrera Panamericana road race; per the brand, the first chronograph designed specifically for motor racing.',
  day='Launch',
  scope='per TAG Heuer',
 ),
 'automatic-chronograph-race': dict(
  title='The automatic chronograph race',
  desc='Three automatic chronograph projects all arrived in 1969: the Zenith El Primero (per the brand, the world\u2019s first high-frequency automatic chronograph calibre), Calibre 11 from the Project 99 consortium led by Heuer (announced 3 March 1969) and the Seiko 6139 (spring 1969, per the Seiko museum). New El Primero generations still run at 36,000 vph today.',
  day='Launch (all in 1969)',
  scope='each brand speaks for its own product',
  limit='Breitling is often named in the Project 99 consortium but does not appear in the TAG Heuer sources checked; the Seiko 6139 is only confirmed for "spring 1969" (Seiko museum) — May is not sufficiently supported',
 ),
 'seiko-astron': dict(
  title='Seiko Astron — the first commercial quartz watch',
  desc='The Seiko Quartz Astron went on sale on 25 December 1969 — the world\u2019s first quartz wristwatch, priced at 450,000 yen. FHH calls the shock that hit the Swiss watch industry afterwards the quartz revolution.',
  day='Commercial launch (25 December 1969)',
  scope='per Seiko and FHH',
 ),
 'ap-royal-oak': dict(
  title='Audemars Piguet Royal Oak',
  desc='The Audemars Piguet Royal Oak launched in 1972 at the Basel fair — Gérald Genta drew the design in one night; a steel watch priced at 3,300 Swiss francs at the time, met with scepticism in the trade, it brought "casual chic" into haute horlogerie (per AP Chronicles).',
  day='Launch',
  scope='AP Chronicles (brand records)',
  limit='The popular phrase "the first luxury steel sports watch" does not appear verbatim on the AP pages checked — the brand\u2019s own wording is used ("casual chic", "reinvented the codes of luxury watchmaking")',
 ),
 'patek-nautilus': dict(
  title='Patek Philippe Nautilus',
  desc='The Patek Philippe Nautilus launched in 1976 — also designed with Gérald Genta, inspired by a ship\u2019s porthole; per the brand, the first steel sports watch in the brand\u2019s 137-year history.',
  day='Launch',
  scope='per Patek Philippe',
  name={'Patek Philippe — Thông cáo 40 năm Nautilus (PDF)': 'Patek Philippe — Press release for 40 years of the Nautilus (PDF)'},
 ),
 'swatch-1983': dict(
  title='Swatch is born, the Swiss industry restructures',
  desc='Swatch launched in 1983 (press day 1 March 1983). Nicolas G. Hayek was given the task of building a strategy to rescue SSIH and ASUAG and merging the two — the foundation of today\u2019s Swatch Group; the group calls Swatch the "spark" of the Swiss watch revival.',
  day='Brand launch',
  scope='Swatch Group and Europa Star',
  limit='Hayek was CEO of SMH in the mid-1980s (the 1983–1985 block appears on the Swatch Group page), not from 1983; the face presenting Swatch on launch day was Ernst Thomke (Europa Star)',
 ),
 'omega-coaxial': dict(
  title='Omega industrialises the Co-Axial escapement',
  desc='Omega put into production the Co-Axial escapement invented by George Daniels (Calibre 2500, 1999) — per Swatch Group: the first new practical mechanical escapement introduced in 250 years.',
  day='Industrialisation',
  scope='per Swatch Group (Omega\u2019s parent group)',
  limit='Daniels\u2019 patent records: priority 30 April 1979, filed at the EPO 25 April 1980, granted 1984 — the exact year of invention is not stated in the sources checked',
 ),
 'un-freak': dict(
  title='Ulysse Nardin Freak — the silicon era',
  desc='The Ulysse Nardin Freak (2001) — no dial, no hands, no crown; per the brand, the first mechanical watch to use silicon, with a Dual Direct Escapement realised by Ludwig Oechslin.',
  day='Launch',
  scope='per Ulysse Nardin',
  limit='"First to use silicon" is the brand\u2019s claim ("the first mechanical watch to use silicon")',
 ),
 'silicon-revival': dict(
  title='Silicon in the movement — the mechanical revival',
  desc='In 2013, Omega introduced a movement resistant to magnetic fields above 15,000 gauss; the Master Chronometer certification with METAS followed in 2015. Silicon hairsprings and escapements have been adopted by many major brands (Patek Philippe Spiromax, Rolex Syloxi, Ulysse Nardin). The mechanical watch keeps developing as a craft heritage in the smartwatch era.',
  day='Period (2013–present)',
  scope='Omega, METAS, Patek Philippe, Rolex, Ulysse Nardin',
  limit='The 15,000-gauss threshold is tied to the METAS-N001 certification; the launch year of Rolex\u2019s Syloxi hairspring could not be verified from the brand\u2019s pages, so no year is stated',
  timeLabel='2013–present',
 ),
}

out = []
for m in d:
    e = EN.get(m['slug'])
    assert e, 'thiếu bản dịch cho ' + m['slug']
    o = {}
    for k, v in m.items():
        if k == 'timeLabel':
            o['timeLabel'] = v
            if e.get('timeLabel'):
                o['timeLabel_en'] = e['timeLabel']
        elif k == 'title':
            o['title'] = v
            o['title_en'] = e['title']
        elif k == 'description':
            o['description'] = v
            o['description_en'] = e['desc']
        elif k == 'dayType':
            o['dayType'] = v
            o['dayType_en'] = e['day']
        elif k == 'claimScope':
            o['claimScope'] = v
            o['claimScope_en'] = e['scope']
        elif k == 'limit':
            o['limit'] = v
            if e.get('limit'):
                o['limit_en'] = e['limit']
        elif k == 'sources':
            ns = []
            for s in v:
                ns.append({
                    'name': s['name'],
                    **({'name_en': e['name'][s['name']]} if e.get('name') and s['name'] in e['name'] else {}),
                    'url': s['url'],
                    'checked': s['checked'],
                    'proves': s['proves'],
                })
            o['sources'] = ns
        else:
            o[k] = v
    out.append(o)

with io.open(PATH, 'w', encoding='utf-8', newline='\n') as f:
    json.dump(out, f, ensure_ascii=False, indent=2)
    f.write('\n')
print('Đã áp dụng bản dịch cho', len(out), 'mốc')
