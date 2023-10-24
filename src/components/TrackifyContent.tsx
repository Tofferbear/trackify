import React from 'react';
import CollapsibleContainer from '../submodules/react-container-components/components/CollapsibleContainer';

export default class TrackifyContent extends React.Component {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <CollapsibleContainer
                enableCollapsing={true}
                label={"Trackify - Spotify Metrics Tracking"}
            >
            </CollapsibleContainer>
        );
    }
}
