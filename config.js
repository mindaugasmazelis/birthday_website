// Configuration for the birthday website
const CONFIG = {
    // Event Details
    event: {
        date: '2025-05-02T18:00:00', // Format: YYYY-MM-DDTHH:mm:ss
        title: 'Grandiozinis įžengimas į 4-tą dešimtį',
        description: 'Prisidėkit į grandiozinį baliuką'
    },

    // Venue Details
    venue: {
        title: 'Papiškiai (.)(.), kaimo turizmo sodyba',
        name: 'Atmintinė',
        coordinates: {
            lat: 54.932662977622826,
            lng: 23.624185403798762
        },
        'time': 'Oficialiai pradžia nuo 18:00, bet mes būsime nuo 14:00, taigi jei galit, prisijunkit anksčiau!',
        '🕑 Laikas': 'Oficialiai pradžia nuo 18:00, bet mes būsime nuo 14:00, taigi jei galit, prisijunkit anksčiau!',
        '🎒 Ką pasiimti': 'Iš būtinų, tai Save. Iš nebūtinų, maudymkes, nes norinčių lauks pirtis ir džiakuzi. Asmeninius daiktus naktynei - dauntų šepetuką, telefono kroviklį ir t.t.',
        '🐾 Gyvūnai': 'Palikim pūkuočius, snapuočius ir visus kitus šįkart namie.',
        '🍗 Maistas': 'Viskuo pasirūpinsim mes.',
        '🍾 Gėrimai': 'Viskuo pasirūpinsim mes. Nors žinoma, netyčia atsivežus, irgi rasim panaudojimą.',
        '💤 Nakvojimas': 'Kadangi renkamės tik vakare, tikiuosi liksit nakvoti. Bus atskiri miegamieji, normalios paklotos lovos.',
        '🕺 Žmonės': 'Didelė dalis žmonių nebus pažįstami vieni su kitais. Neabejoju, kad rasit bendrą kalbą, bet paruošim veiklų susipažinimui.'
    },

    // Gallery Settings
    gallery: {
        imagesPath: 'images/', // Base path for all gallery images
        items: [
            {
                image: 'tadas_iveta.png', // Using an existing image
                title: 'Tadas ir Iveta',
                description: 'Tadas ir Iveta'
            }
        ],
        visible: false  // Controls visibility of the gallery section
    },

    // Spotify Settings
    spotify: {
        playlistId: '3kDl1zW4tsOtn94yMsUgDe',
        embedHeight: '380'
    },

    // Theme Settings
    theme: {
        primaryColor: '#2c3e50',
        secondaryColor: '#34495e',
        backgroundColor: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        textColor: '#333'
    },

    // Debug Settings
    debug: {
        enabled: false,  // Set to false to hide the debug download button
        buttonVisible: false  // Controls visibility of the debug download button
    }
}; 