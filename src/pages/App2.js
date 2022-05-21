import FolderTree, { testData } from 'react-folder-tree';

const BasicTree = () => {
  const onTreeStateChange = (state, event) => console.log(state, event);

  return (
    <FolderTree
      data={ testData }
      onChange={ onTreeStateChange }
    />
  );
};