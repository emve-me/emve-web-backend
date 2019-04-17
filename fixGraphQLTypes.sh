#!/usr/bin/env sh

sed -i -e 's/interface /export interface /g' graphqlTypes.d.ts
sed -i -e 's/const /export const /g' graphqlTypes.d.ts
sed -i -e 's/declare namespace GQL {//g' graphqlTypes.d.ts
sed -i -e '/__typename/c\\t\t__typename: string | null' graphqlTypes.d.ts
sed -i -e 's/^}//g' graphqlTypes.d.ts

echo "Fixed GraphQL types"



