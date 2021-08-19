export function dynamicAttr(attribute: string, value: any) {
   const opts: {[k: string]: any} = {};
   opts[attribute] = value;
   return opts;
};

export function conditionClassName(initialClassName: string, condition: Boolean, optionalClassName: string) {
   if (condition) {
      return `${initialClassName} ${optionalClassName}`;
   } else {
      return initialClassName;
   }
}