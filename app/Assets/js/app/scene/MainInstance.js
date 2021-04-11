import SceneManager from '@app/scene/SceneManager';

//All hail The SINGLETON!
const MainSceneInstance = new SceneManager(document.getElementById('renderCanvas'));

export default MainSceneInstance;