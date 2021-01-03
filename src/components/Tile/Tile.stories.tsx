import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Tile from './Tile';
import Chat from 'src/assets/chat.svg';

export default {
    title: 'Rua/Tile',
    component: Tile,

} as Meta;



export const Internal = () =>
    <div>
        <Tile
            icon={<Chat />}
            title="This is the Tile title"
            description="In order to make the tile a link, the link prop needs to be set.
    It can be either an internal or external link, or an onClick function"
            link="http://cloud.manager.com"
        />
    </div>

