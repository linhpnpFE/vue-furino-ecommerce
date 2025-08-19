<!-- src/views/Compare.vue -->
<script setup lang="ts">
import BannerChild from "@/components/BannerChild.vue";
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.css'
import { computed, ref, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { products } from "@/data/products.typed"
import RatingStars from "@/components/RatingStars.vue"

const route = useRoute()
const router = useRouter()

// Lấy list id từ query ?ids=1,2,3
const ids = computed<string[]>(() => {
  const q = route.query.ids as string | undefined
  return q ? q.split(',').filter(Boolean) : []
})

// Map id -> product, tối đa 3 cột
const compared = computed(() =>
    ids.value.map(id => products.find(p => String(p.id) === String(id)))
        .filter(Boolean)
        .slice(0, 3)
)

// Options cho dropdown: chỉ hiện tên
const selected = ref<{id:string; name:string} | null>(null)
const optionObjects = computed(() =>
    products
        .filter(p => !ids.value.includes(String(p.id))) // ẩn sp đã chọn
        .map(p => ({ id: String(p.id), name: p.name }))
)

// helper cập nhật query
function setIds(next: string[]) {
  router.replace({
    name: 'ProductComparison',
    query: { ...route.query, ids: next.length ? next.join(',') : undefined }
  })
}
function addId(id: string) {
  const next = Array.from(new Set([...ids.value, id])).slice(0, 3)
  setIds(next)
}
function removeId(id: string) {
  setIds(ids.value.filter(x => x !== id))
}

// khi chọn trong Multiselect
watch(selected, (v) => {
  if (v?.id) addId(v.id)
  selected.value = null // reset ô chọn
})

/** ================== EQUALIZER CHIỀU CAO LI ================== */
const eqWrap = ref<HTMLElement | null>(null)

function equalizeRows() {
  const root = eqWrap.value
  if (!root) return

  // Tập các nhóm cần equalize (general/product/dimensions/warranty)
  const groupNames = new Set<string>()
  root.querySelectorAll<HTMLElement>('.eq-section[data-group]').forEach(el => {
    const g = el.dataset.group
    if (g) groupNames.add(g)
  })

  groupNames.forEach(group => {
    const cols = Array.from(root.querySelectorAll<HTMLElement>(`.eq-section[data-group="${group}"]`))
    if (!cols.length) return

    // reset minHeight trước khi đo
    cols.forEach(col =>
        col.querySelectorAll<HTMLElement>('.eq-row').forEach(li => (li.style.minHeight = ''))
    )

    // Số hàng tối đa trong nhóm
    const rows = Math.max(...cols.map(c => c.querySelectorAll('.eq-row').length))

    // Với mỗi hàng i, set minHeight = max height giữa các cột
    for (let i = 0; i < rows; i++) {
      const cells: HTMLElement[] = []
      cols.forEach(col => {
        const li = col.querySelectorAll<HTMLElement>('.eq-row')[i]
        if (li) cells.push(li)
      })
      const maxH = cells.length ? Math.max(...cells.map(c => c.offsetHeight)) : 0
      cells.forEach(c => (c.style.minHeight = `${maxH}px`))
    }
  })
}

onMounted(() => {
  nextTick(equalizeRows)
  window.addEventListener('resize', equalizeRows)
  window.addEventListener('load', equalizeRows) // ảnh & font đã tải

  // nếu có ảnh bên trong, re-run khi ảnh load xong
  nextTick(() => {
    eqWrap.value?.querySelectorAll('img').forEach(img => {
      img.addEventListener('load', equalizeRows, { once: true })
    })
  })
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', equalizeRows)
  window.removeEventListener('load', equalizeRows)
})

// Re-run khi danh sách so sánh thay đổi
watch([ids, compared], () => nextTick(equalizeRows))
/** ============================================================ */
</script>

<template>
  <banner-child title="Product Comparison" class="mb-8 xl:mb-10"/>

  <section class="mb-10">
    <div class="container">
      <div class="flex gap-10">
        <div class="w-[220px] flex-shrink-0">
          <div class="mb-10">
            <div class="text-xl mb-4">Go to Product page for more Products</div>
            <router-link to="/shop" class="text-xl underline underline-offset-8">View More</router-link>
          </div>

          <div>
            <div class="text-xl font-bold mb-4">Add A Product</div>
            <Multiselect
                v-model="selected"
                :options="optionObjects"
                label="name"
                track-by="id"
                :searchable="true"
                :show-labels="false"
                placeholder="Choose a Product"
                class="w-[200px]"
            />
          </div>
        </div>

        <div class="flex-1 grid grid-cols-1 md:grid-cols-3 gap-10 mr-5">
          <div v-for="p in compared" :key="p!.id" class="relative">
            <button class="absolute right-3 top-3 text-sm underline size-5 rounded-full bg-white/70 flex items-center justify-center"
                    @click="removeId(String(p!.id))">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>

            <router-link :to="{ name: 'ProductDetail', params: { id: p!.id }, state: { product: p } }">
              <div class="h-[170px] 2xl:h-[200px] rounded-lg overflow-hidden mb-4">
                <img :src="p!.thumb" :alt="p!.name" class="size-full object-cover">
              </div>
              <div class="text-xl font-semibold mb-3">{{ p!.name }}</div>
              <span class="mb-4 block">Rs. {{ p!.price }}</span>
              <div class="flex items-center gap-1">
                <span class="mt-1">{{ p!.rating }}</span>
                <RatingStars :rating="p!.rating" :reviewCount="p!.reviewCount" />
                <span class="text-gray-500 text-sm">Review</span>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- SPECS -->
  <section class="mb-14 xl:mb-20">
    <div class="container">
      <!-- Đặt ref vào wrapper này (bao cả cột nhãn + cột sản phẩm) -->
      <div class="flex border-t border-t-D9D9D9" ref="eqWrap">
        <!-- Cột nhãn -->
        <div class="w-[240px] flex-shrink-0 border-r border-D9D9D9 pt-10 pr-10">
          <div class="mb-10">
            <div class="mb-4 text-2xl">General</div>
            <!-- thêm eq-section + data-group -->
            <ul class="flex flex-col gap-3 eq-section" data-group="general">
              <li class="eq-row">Sales Package</li>
              <li class="eq-row">Model Number</li>
              <li class="eq-row">Secondary Material</li>
              <li class="eq-row">Configuration</li>
              <li class="eq-row">Upholstery Material</li>
              <li class="eq-row">Upholstery Color</li>
            </ul>
          </div>

          <div class="mb-10">
            <div class="mb-4 text-2xl">Product</div>
            <ul class="flex flex-col gap-3 eq-section" data-group="product">
              <li class="eq-row">Filling Material</li>
              <li class="eq-row">Finish Type</li>
              <li class="eq-row">Adjustable Headrest</li>
              <li class="eq-row">Maximum Load Capacity</li>
              <li class="eq-row">Origin of Manufacture</li>
            </ul>
          </div>

          <div class="mb-10">
            <div class="mb-4 text-2xl">Dimensions</div>
            <ul class="flex flex-col gap-3 eq-section" data-group="dimensions">
              <li class="eq-row">Width</li>
              <li class="eq-row">Height</li>
              <li class="eq-row">Depth</li>
              <li class="eq-row">Weight</li>
              <li class="eq-row">Leg Height</li>
            </ul>
          </div>

          <div class="mb-10">
            <div class="mb-4 text-2xl">Warranty</div>
            <ul class="flex flex-col gap-3 eq-section" data-group="warranty">
              <li class="eq-row">Warranty Summary</li>
              <li class="eq-row">Warranty Service Type</li>
              <li class="eq-row">Covered in Warranty</li>
              <li class="eq-row">Not Covered in Warranty</li>
              <li class="eq-row">Domestic Warranty</li>
            </ul>
          </div>
        </div>

        <!-- Các cột sản phẩm (không đổi, vẫn có eq-section/eq-row) -->
        <div class="flex-1 grid grid-cols-1 md:grid-cols-3">
          <div v-for="p in compared" :key="'spec-'+p!.id" class="border-r border-D9D9D9 last:border-0 pt-10 px-8">
            <!-- General -->
            <div class="mb-10">
              <div class="mb-4 text-2xl h-8"></div>
              <ul class="flex flex-col gap-3 eq-section" data-group="general">
                <li class="eq-row">{{ p.specs?.general?.salesPackage ?? '—' }}</li>
                <li class="eq-row">{{ p.specs?.general?.modelNumber ?? '—' }}</li>
                <li class="eq-row">{{ p.specs?.general?.secondaryMaterial ?? '—' }}</li>
                <li class="eq-row">{{ p.specs?.general?.configuration ?? '—' }}</li>
                <li class="eq-row">{{ p.specs?.general?.upholsteryMaterial ?? '—' }}</li>
                <li class="eq-row">{{ p.specs?.general?.upholsteryColor ?? '—' }}</li>
              </ul>
            </div>

            <!-- Product -->
            <div class="mb-10">
              <div class="mb-4 text-2xl h-8"></div>
              <ul class="flex flex-col gap-3 eq-section" data-group="product">
                <li class="eq-row">{{ p.specs?.product?.fillingMaterial ?? '—' }}</li>
                <li class="eq-row">{{ p.specs?.product?.finishType ?? '—' }}</li>
                <li class="eq-row">{{ (p.specs?.product?.adjustableHeadrest ?? false) ? 'Yes' : 'No' }}</li>
                <li class="eq-row">
                  {{ p.specs?.product?.maxLoad ?? '—' }}<span v-if="p.specs?.product?.maxLoad"> kg</span>
                </li>
                <li class="eq-row">{{ p.specs?.product?.origin ?? '—' }}</li>
              </ul>
            </div>

            <!-- Dimensions -->
            <div class="mb-10">
              <div class="mb-4 text-2xl h-8"></div>
              <ul class="flex flex-col gap-3 eq-section" data-group="dimensions">
                <li class="eq-row">
                  <template v-if="p.specs?.dimensions">{{ p.specs.dimensions.width }} cm</template>
                  <template v-else>—</template>
                </li>
                <li class="eq-row">
                  <template v-if="p.specs?.dimensions">{{ p.specs.dimensions.height }} cm</template>
                  <template v-else>—</template>
                </li>
                <li class="eq-row">
                  <template v-if="p.specs?.dimensions">{{ p.specs.dimensions.depth }} cm</template>
                  <template v-else>—</template>
                </li>
                <li class="eq-row">
                  <template v-if="p.specs?.dimensions">{{ p.specs.dimensions.weight }} kg</template>
                  <template v-else>—</template>
                </li>
                <li class="eq-row">
                  <template v-if="p.specs?.dimensions">{{ p.specs.dimensions.legHeight }} cm</template>
                  <template v-else>—</template>
                </li>
              </ul>
            </div>

            <!-- Warranty -->
            <div class="mb-10">
              <div class="mb-4 text-2xl h-8"></div>
              <ul class="flex flex-col gap-3 eq-section" data-group="warranty">
                <li class="eq-row">{{ p.specs?.warranty?.summary ?? '—' }}</li>
                <li class="eq-row">{{ p.specs?.warranty?.serviceType ?? '—' }}</li>
                <li class="eq-row">{{ (p.specs?.warranty?.covered ?? []).join(', ') || '—' }}</li>
                <li class="eq-row">{{ (p.specs?.warranty?.notCovered ?? []).join(', ') || '—' }}</li>
                <li class="eq-row">
                  <template v-if="p.specs?.warranty?.domesticWarrantyMonths !== undefined">
                    {{ p.specs!.warranty!.domesticWarrantyMonths }} months
                  </template>
                  <template v-else>—</template>
                </li>
              </ul>
            </div>
            <div class="text-center">
              <button class="py-3 px-14 bg-B88E2F text-white border border-B88E2F rounded font-semibold block text-center lg:w-max mx-auto hover:text-B88E2F hover:bg-white">Add to cart</button>
            </div>
          </div>
          <div v-for="i in (3 - compared.length)" :key="'spec-empty'+i" class="pt-10 px-5"></div>
        </div>
      </div>
    </div>
  </section>
</template>
