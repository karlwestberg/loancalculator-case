export default {
    plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx', '@svgr/plugin-prettier'],
    typescript: true,
    titleProp: true,
    index: false,
    template: (variables, { tpl }) => {
        return tpl`
        ${variables.imports.filter(imp => imp.importKind === 'type')};
        
        ${variables.interfaces};
        
        export default function ${
        variables.componentName.startsWith("Svg")
        ? variables.componentName.slice(3)
        : variables.componentName
        }(${variables.props}) {
        return ${variables.jsx};
        }
        `
    }
}
