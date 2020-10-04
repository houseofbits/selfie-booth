import React from 'react';
 
export default
class CameraPreview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };    
    }
    componentDidMount() {
        
        let parent = this;
        
        if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function (stream) {
                parent.videoRef.srcObject = stream;
            })
            .catch(function (error) {   });
        }
    }    
    render() {        
        return <div>
            	<video ref={(el) => {this.videoRef = el}} autoPlay={true} id="videoElement"></video>
            </div>;
    }
}
