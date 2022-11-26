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
};

export default function getPhotoSceneParams() {
    return {
        ShroomsScene: {
            effect: Effects.MIX_ALPHA,
            logoPosition: [-160, 730],
            tint: [0.9, 1.0, 0.8],
            options: {
                shroom1: {
                    texture: ShroomsTexture1,
                    faceParams: [500, 500, 200, 200],
                },
                shroom2: {
                    texture: ShroomsTexture2,
                    faceParams: [0.67, 0.88, 0.34, 0.34],
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
                    faceParams: [0.75, 0.78, 0.51, 0.6],
                },
                amber2: {
                    texture: AmberTexture2,
                    faceParams: [0.79, 0.8, 0.62, 0.64],
                },
                amber3: {
                    texture: AmberTexture3,
                    faceParams: [0.7, 0.7, 0.65, 0.65],
                },
                amber4: {
                    texture: AmberTexture4,
                    faceParams: [0.73, 0.7, 0.6, 0.65],
                },
            }
        },
        ArchiveScene: {
            effect: Effects.OVERLAY,
            logoPosition: [-160, 730],
            tint: [1.0, 1.0, 1.0],
            options: {
                archive1: {
                    texture: ArchiveTexture,
                    faceParams: [0.7, 0.83, 0.33, 0.45],
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
                    faceParams: [0.7, 0.75, 0.42, 0.45],
                },
                egg2: {
                    texture: BirdsTexture2,
                    faceParams: [0.74, 0.75, 0.52, 0.48],
                },
                egg3: {
                    texture: BirdsTexture3,
                    faceParams: [0.7, 0.75, 0.42, 0.45],
                },
                egg4: {
                    texture: BirdsTexture4,
                    faceParams: [0.7, 0.75, 0.42, 0.45],
                },
            }
        },
        BugsScene: {
            effect: Effects.MIX_ALPHA,
            logoPosition: [-160, 730],
            tint: [1.0, 1.0, 1.0],
            options: {
                bug1: {
                    texture: BugsTexture1,
                    faceParams: [0.5, 0.25, 0.5, 0.5],
                },
                bug2: {
                    texture: BugsTexture2,
                    faceParams: [0.5, 0.25, 0.5, 0.5],
                },
                bug3: {
                    texture: BugsTexture3,
                    faceParams: [0.5, 0.25, 0.5, 0.5],
                },
            }
        },
        CoralScene: {
            effect: Effects.OVERLAY,
            logoPosition: [-160, 730],
            tint: [1.0, 1.0, 1.0],
            options: {
                coral1: {
                    texture: CoralTexture1,
                    faceParams: [0.5, 0.25, 0.5, 0.5],
                },
                coral2: {
                    texture: CoralTexture2,
                    faceParams: [0.5, 0.25, 0.5, 0.5],
                },
                coral3: {
                    texture: CoralTexture3,
                    faceParams: [0.5, 0.25, 0.5, 0.5],
                },
            }
        },
        DinosaursScene: {
            effect: Effects.MIX_ALPHA,
            logoPosition: [-160, 730],
            tint: [1.0, 1.0, 1.0],
            options: {
                dinosaurs1: {
                    texture: DinosaursTexture1,
                    faceParams: [0.5, 0.25, 0.5, 0.5],
                },
                dinosaurs2: {
                    texture: DinosaursTexture2,
                    faceParams: [0.5, 0.25, 0.5, 0.5],
                },
                dinosaurs3: {
                    texture: DinosaursTexture3,
                    faceParams: [0.5, 0.25, 0.5, 0.5],
                },
                dinosaurs4: {
                    texture: DinosaursTexture4,
                    faceParams: [0.5, 0.25, 0.5, 0.5],
                },
            }
        },
        DisplayScene: {
            effect: Effects.MIX_ALPHA,
            logoPosition: [-160, 730],
            tint: [1.0, 1.0, 1.0],
            options: {
                display1: {
                    texture: DisplayTexture1,
                    faceParams: [0.5, 0.25, 0.5, 0.5],
                },
                display2: {
                    texture: DisplayTexture2,
                    faceParams: [0.5, 0.25, 0.5, 0.5],
                },
                display3: {
                    texture: DisplayTexture3,
                    faceParams: [0.5, 0.25, 0.5, 0.5],
                },
            }
        },
    };
}