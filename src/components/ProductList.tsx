
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle, Pencil, Trash2, Check, X } from "lucide-react";
import { useState } from "react";
import ProductForm from "./ProductForm";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  inStock: boolean;
};

const ProductList = () => {
  const [showForm, setShowForm] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleSaveProduct = (product: Omit<Product, 'id'>) => {
    if (editingProduct) {
      setProducts(products.map(p => 
        p.id === editingProduct.id 
          ? { ...product, id: editingProduct.id } 
          : p
      ));
      setEditingProduct(null);
    } else {
      setProducts([...products, { ...product, id: crypto.randomUUID() }]);
    }
    setShowForm(false);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Product Management</h1>
        <Button onClick={() => setShowForm(true)} className="flex items-center gap-2">
          <PlusCircle className="w-4 h-4" />
          Add Product
        </Button>
      </div>

      {showForm && (
        <div className="mb-6">
          <ProductForm
            onSave={handleSaveProduct}
            onCancel={() => {
              setShowForm(false);
              setEditingProduct(null);
            }}
            initialProduct={editingProduct || undefined}
          />
        </div>
      )}

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>${product.price.toFixed(2)}</TableCell>
                <TableCell>
                  <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm ${
                    product.inStock 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {product.inStock ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleEdit(product)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDelete(product.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {products.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-gray-500 py-8">
                  No products added yet. Click "Add Product" to get started.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ProductList;
