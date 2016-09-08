### Table of Contents
* [vindue](#vindue)
	* [Tree](#TreeStructure)
	* [Drag and Drop](#DnD)
	* [Separators / Resizing](#Separator)

<a name="vindue" />
# vindue

![Screenshot of website focusing on the viewmanagement ](https://github.com/j-moeller/dsl-angular2/blob/8a2e86b7bba9c0746cc02cd6e3e880761e8ad913/documentation/assets/tree.png)

<a name="TreeStructure" />
## Tree-Structure

The windowstate is stored as a tree. Additionally, the nodes save the current configuration (size, orientation, children and - if it's a leaf-node - loaded panel). The image below shows the **start configuration for each of the following tree-modifications**.

![](https://github.com/j-moeller/dsl-angular2/blob/a7d2d985f67169ad80f78d9c796ce09e25c929ad/documentation/assets/basic-tree.png)

### Adding a panel

Adding a panel is done by clicking the top-left button. A window is shown, where the user can select the panel content and the panel is add as the last element of the tree. Using drag and drop, the user can place the panel.

![](https://github.com/j-moeller/dsl-angular2/blob/a7d2d985f67169ad80f78d9c796ce09e25c929ad/documentation/assets/add-tree.png)

### Closing a panel (Elevation 1)

Closing a panel is done by clicking the top-left button of a panel (marked with an 'x'). In the following example the red panel has been closed. Because this leaves the parent-node with one child remaining, the (only) child is elevated by one level and therefore replaces its parent.

![](https://github.com/j-moeller/dsl-angular2/blob/a7d2d985f67169ad80f78d9c796ce09e25c929ad/documentation/assets/close-tree.png)

### Promoting panels (Elevation 2)

'Promoting' is a special closing-case and done when a node is left with one child, which isn't a panel leaf-node. Promoting elevates panels by two levels. If for example the green panel is closed, its parent is left with one child (the only child). If the only child were elevated by one level (therefore replaces its parent), the orientation of its children would be switched (thus messing up the configuration). Therefore, the only child's children are elevated by two levels, which preserves the orientation.

![](https://github.com/j-moeller/dsl-angular2/blob/a7d2d985f67169ad80f78d9c796ce09e25c929ad/documentation/assets/promote-tree.png)

<a name="DnD" />
## Drag and Drop

_coming soon_

<a name="Separator" />
## Separators / Resizing

_coming soon_
