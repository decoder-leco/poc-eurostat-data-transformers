import { Tree } from 'react-arborist'; // https://www.npmjs.com/package/react-json-tree
// If you're using Immutable.js: `npm i --save immutable`


/*

// Inside a React component:
const json = {
  array: [1, 2, 3],
  bool: true,
  object: {
    foo: 'bar',
  },
  immutable: Map({ key: 'value' }),
};

<JSONTree data={json} />;
*/


























// import './ApiTypeChildrenTree.module.css';

interface ApiTypeChildrenTreeProps{
  json: any
};

export default function ApiTypeChildrenTree({ json }: ApiTypeChildrenTreeProps) {

	return (
		<>
        <Tree initialData={[json]} />
		</>
	);
}

