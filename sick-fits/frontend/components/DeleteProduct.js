import React from "react";
import toast, { Toaster } from "react-hot-toast";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { ALL_PRODUCTS_QUERY } from "./Products";

const DELETE_SINGLE_PRODUCT = gql`
  mutation DELETE_SINGLE_PRODUCT($id: ID!) {
    deleteProduct(id: $id) {
      id
      name
    }
  }
`;

function update(cache, payload) {
  cache.evict(cache.identify(payload.data.deleteProduct));
}

export default function DeleteProduct({ id, children }) {
  const [deleteProduct, { data, error, loading }] = useMutation(
    DELETE_SINGLE_PRODUCT,
    {
      variables: {
        id,
      },
      update,
    }
  );

  return (
    <button
      type="button"
      disabled={loading}
      onClick={async () => {
        if (confirm("Are you sure you want to delete this item?")) {
          // call delete mutation
          toast.promise(deleteProduct(), {
            loading: "Deleting...",
            success: `Delete item of ${id}`,
            error: `Error when deleting..${error}`,
          });
        }
      }}
    >
      {children}
    </button>
  );
}
