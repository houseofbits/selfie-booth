import ShroomsTexture1 from '@images/shrooms/bg1-2.png';
import ShroomsTexture2 from '@images/shrooms/bg2-2.png';
import AmberTexture1 from '@images/amber/bg1.png';
import AmberTexture2 from '@images/amber/bg2.png';
import AmberTexture3 from '@images/amber/bg3.png';
import AmberTexture4 from '@images/amber/bg4.png';
import ArchiveTexture from '@images/archive/bg1.png';
import BirdsTexture1 from '@images/birds/bg1.png';
import BirdsTexture2 from '@images/birds/bg2.png';
import BirdsTexture3 from '@images/birds/bg3.png';
import BirdsTexture4 from '@images/birds/bg4.png';
import BugsTexture1 from '@images/bugs/bg1.png';
import BugsTexture2 from '@images/bugs/bg2-2.png';
import BugsTexture3 from '@images/bugs/bg3-2.png';
import CoralTexture1 from '@images/coral/bg1.png';
import CoralTexture2 from '@images/coral/bg2.png';
import CoralTexture3 from '@images/coral/bg3.png';
import DinosaursTexture1 from "@images/dinosaurs/bg1.png";
import DinosaursTexture2 from "@images/dinosaurs/bg2.png";
import DinosaursTexture3 from "@images/dinosaurs/bg3.png";
import DinosaursTexture4 from "@images/dinosaurs/bg4.png";
import DisplayTexture1 from "@images/display/background1.png";
import DisplayTexture2 from "@images/display/background2.png";
import DisplayTexture3 from "@images/display/background3.png";

const Effects = {
    MIX_ALPHA: 0,
    OVERLAY: 1,
    ARCHIVE: 2,
    HEADS: 3,
    WATER: 4,
    SHROOMS: 5,
};

export default function getPhotoSceneParams() {
    return {
        ShroomsScene: {
            effect: Effects.SHROOMS,
            logoPosition: [-160, 730],
            tint: [0.9, 1.0, 0.8],
            options: {
                shroom1: {
                    texture: ShroomsTexture1,
                    faceParams: [350, 330, 400, 620],
                },
                shroom2: {
                    texture: ShroomsTexture2,
                    faceParams: [320, 240, 400, 620],
                },
            },
        },
        AmberScene: {
            effect: Effects.OVERLAY,
            logoPosition: [-160, 730],
            tint: [0.9, 1.0, 0.8],
            options: {
                amber1: {
                    texture: AmberTexture1,
                    faceParams: [150, 400, 800, 1150],
                },
                amber2: {
                    texture: AmberTexture2,
                    faceParams: [150, 450, 800, 1150],
                },
                amber3: {
                    texture: AmberTexture3,
                    faceParams: [300, 600, 700, 1100],
                },
                amber4: {
                    texture: AmberTexture4,
                    faceParams: [200, 500, 700, 1150],
                },
            }
        },
        ArchiveScene: {
            effect: Effects.ARCHIVE,
            logoPosition: [-160, 730],
            tint: [1.0, 1.0, 1.0],
            options: {
                archive1: {
                    texture: ArchiveTexture,
                    faceParams: [340, 450, 350, 700],
                }
            }
        },
        BirdsScene: {
            effect: Effects.MIX_ALPHA,
            logoPosition: [-160, 730],
            tint: [1.0, 1.0, 1.0],
            options: {
                egg1: {
                    texture: BirdsTexture1,
                    faceParams: [300, 600, 500, 800],
                },
                egg2: {
                    texture: BirdsTexture2,
                    faceParams: [200, 700, 700, 850],
                },
                egg3: {
                    texture: BirdsTexture3,
                    faceParams: [350, 600, 500, 800],
                },
                egg4: {
                    texture: BirdsTexture4,
                    faceParams: [260, 500, 600, 900],
                },
            }
        },
        BugsScene: {
            effect: Effects.HEADS,
            logoPosition: [-160, 730],
            tint: [1.0, 1.0, 1.0],
            options: {
                bug1: {
                    texture: BugsTexture1,
                    faceParams: [610, 610, 400, 500],
                },
                bug2: {
                    texture: BugsTexture2,
                    faceParams: [540, 340, 400, 580],
                },
                bug3: {
                    texture: BugsTexture3,
                    faceParams: [200, 410, 430, 600],
                },
            }
        },
        CoralScene: {
            effect: Effects.WATER,
            logoPosition: [-160, 730],
            tint: [1.0, 1.0, 1.0],
            options: {
                coral1: {
                    texture: CoralTexture1,
                    faceParams: [150, 270, 600, 900],
                },
                coral2: {
                    texture: CoralTexture2,
                    faceParams: [50, 990, 600, 1000],
                },
                coral3: {
                    texture: CoralTexture3,
                    faceParams: [580, 100, 500, 900],
                },
            }
        },
        DinosaursScene: {
            effect: Effects.HEADS,
            logoPosition: [-160, 730],
            tint: [1.0, 1.0, 1.0],
            options: {
                dinosaurs1: {
                    texture: DinosaursTexture1,
                    faceParams: [260, 410, 420, 560],
                },
                dinosaurs2: {
                    texture: DinosaursTexture2,
                    faceParams: [140, 460, 430, 560],
                },
                dinosaurs3: {
                    texture: DinosaursTexture3,
                    faceParams: [160, 600, 460, 520],
                },
                dinosaurs4: {
                    texture: DinosaursTexture4,
                    faceParams: [160, 600, 460, 540],
                },
            }
        },
        DisplayScene: {
            effect: Effects.HEADS,
            logoPosition: [-160, 730],
            tint: [1.0, 1.0, 1.0],
            options: {
                display1: {
                    texture: DisplayTexture1,
                    faceParams: [420, 440, 420, 560],
                },
                display2: {
                    texture: DisplayTexture2,
                    faceParams: [430, 570, 420, 520],
                },
                display3: {
                    texture: DisplayTexture3,
                    faceParams: [390, 550, 420, 560],
                },
            }
        },
    };
}