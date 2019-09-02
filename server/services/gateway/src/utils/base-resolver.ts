export class BaseResolver {
    fields(info) {
        const fields = info.fieldNodes[0].selectionSet.selections.filter(
            field => !field.selectionSet
        );
        return fields.map(field => field.name.value);
    }
    relations(info) {
        const fields = info.fieldNodes[0].selectionSet.selections.filter(
            field => field.selectionSet
        );
        return fields.map(field => {
            return {
                [field.name.value]: [
                    ...field.selectionSet.selections.map(
                        field => field.name.value
                    )
                ]
            };
        });
    }
}
