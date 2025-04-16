
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import type { Product } from "./ProductList";

interface ProductFormProps {
  onSave: (product: Omit<Product, 'id'>) => void;
  onCancel: () => void;
  initialProduct?: Product;
}

const ProductForm = ({ onSave, onCancel, initialProduct }: ProductFormProps) => {
  const [formData, setFormData] = useState({
    name: initialProduct?.name || "",
    description: initialProduct?.description || "",
    price: initialProduct?.price || "",
    inStock: initialProduct?.inStock ?? true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name: formData.name,
      description: formData.description,
      price: Number(formData.price),
      inStock: formData.inStock,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg border space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Product Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="price">Price ($)</Label>
        <Input
          id="price"
          type="number"
          step="0.01"
          min="0"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          required
        />
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="stock"
          checked={formData.inStock}
          onCheckedChange={(checked) => setFormData({ ...formData, inStock: checked })}
        />
        <Label htmlFor="stock">In Stock</Label>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {initialProduct ? 'Update' : 'Add'} Product
        </Button>
      </div>
    </form>
  );
};

export default ProductForm;
