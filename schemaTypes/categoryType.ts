import {defineField, defineType} from 'sanity'

export const categoryType = defineType({
  name: 'category',
  title: 'Categoría',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Nombre',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'value',
      title: 'Valor para API',
      description:
        'Valor que coincide con el enum PostCategory en Angular (ej: TECH, DESIGN, etc.)',
      type: 'string',
      validation: (rule) =>
        rule
          .required()
          .regex(/^[A-Z0-9_]+$/, {
            name: 'uppercase',
            invert: false,
          })
          .error(
            'Debe estar en mayúsculas, números y guiones bajos (ej: TECH, DESIGN_UI, CATEGORY_2023)',
          ),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'value',
    },
    prepare(selection) {
      const {title, subtitle} = selection
      return {
        title: title || 'Sin título',
        subtitle: subtitle,
      }
    },
  },
})
