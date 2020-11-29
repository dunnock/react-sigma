import React from 'react';
import { storiesOf } from '@storybook/react';
import { Sigma, LoadJSON, LoadGEXF, RandomizeNodePositions } from '../src/index';

storiesOf('Loading', module)
  .add('LoadJSON without coords', () => (
    <Sigma>
      <LoadJSON path={String(process.env.PUBLIC_URL) + "/geolocalized.json"}>
        <RandomizeNodePositions/>
      </LoadJSON>
  	</Sigma>
  ))
  .add( 'LoadJSON without coords seeded', () => {
    return (
      <Sigma>
        <LoadJSON path={String( process.env.PUBLIC_URL ) + "/geolocalized.json"}>
          <RandomizeNodePositions seed={42} />
        </LoadJSON>
      </Sigma>
    )
  } )
  .add('LoadJSON with coords', () => (
    <Sigma>
      <LoadJSON path={String(process.env.PUBLIC_URL) + "/arctic.json"}/>
    </Sigma>
  ))
  .add('LoadGEXF', () => (
    <Sigma>
      <LoadGEXF path={String(process.env.PUBLIC_URL) + "/arctic.gexf"}/>
    </Sigma>
  ))
