import { createLazyFileRoute } from '@tanstack/react-router';

import 'react-complex-tree/lib/style-modern.css';
import { UncontrolledTreeEnvironment, Tree, StaticTreeDataProvider, TreeItem, TreeItemIndex } from 'react-complex-tree';
import { JSONSchema4 } from 'json-schema';
export const Route = createLazyFileRoute('/about')({
  component: About,
});

class JSONSchemaTreeItem implements TreeItem<JSONSchema4> {
  next?: JSONSchemaTreeItem[];
  propName?: string;
  constructor(public readonly index: string, public readonly data: JSONSchema4) {}

  get isFolder() {
    return this.children && this.children.length > 0;
  }

  get children() {
    return this.next?.map((node) => node.index);
  }

  get title() {
    const res = this.propName || '';
    if (this.data.type === 'object') {
      return res + ' {...}';
    }
    if (this.data.type === 'array') {
      return res + ' [...]';
    }
    return res + ': ' + this.data.type;
  }
}
export type JSONSchemaTreeItems = Record<string, JSONSchemaTreeItem>;

const schema0: JSONSchema4 = {
  type: 'object',
  properties: {
    firstName: {
      type: 'string',
    },
    lastName: {
      type: 'string',
    },
    age: {
      type: 'number',
    },
    favors: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
          },
        },
      },
    },
  },
};
const schema1: JSONSchema4 = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
      },
    },
  },
};

function readSchemaTree(schemaTreeNode: JSONSchemaTreeItem): JSONSchemaTreeItems {
  const root = new JSONSchemaTreeItem('root', null!);
  root.next = [schemaTreeNode];
  const result: JSONSchemaTreeItems = {};
  const flatten = (nodes: JSONSchemaTreeItem[]) => {
    nodes.forEach((node) => {
      result[node.index] = node;
      if (node.next) {
        flatten(node.next);
      }
    });
    return nodes.map((node) => node.index);
  };
  flatten([root]);
  return result;
}

function makeSchemaTree(schema: JSONSchema4, paths: string[] = []): JSONSchemaTreeItem {
  const node = new JSONSchemaTreeItem(paths.concat(schema.type!).join('.'), schema);

  switch (schema.type) {
    case 'object': {
      const children = [];
      for (const name in schema.properties) {
        const child = makeSchemaTree(schema.properties[name], [node.index, name]);
        child.propName = name;
        children.push(child);
      }
      node.next = children;
      break;
    }
    case 'array': {
      if (schema.items) {
        node.next = [makeSchemaTree(schema.items, [node.index])];
      }
      break;
    }
    default: {
      //
    }
  }

  return node;
}

function About() {
  const schemaTree = makeSchemaTree(schema0);
  console.log(schemaTree);
  const items = readSchemaTree(schemaTree);
  console.log(items);
  return (
    <>
      <UncontrolledTreeEnvironment<JSONSchema4>
        dataProvider={new StaticTreeDataProvider(items)}
        getItemTitle={(item) => (item as JSONSchemaTreeItem).title}
        canDragAndDrop={true}
        canReorderItems={true}
        canDropOnFolder={true}
        canDropOnNonFolder={true}
        viewState={{}}
      >
        <Tree treeId="tree-1" rootItem="root" treeLabel="Tree Example" />
      </UncontrolledTreeEnvironment>
    </>
  );
}
