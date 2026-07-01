<template>
  <li :class="{ active: isActive }">
    <a
      v-if="isMenu"
      href="#"
      class="nav-link sidebar-menu-item"
      :aria-expanded="!collapsed"
      data-toggle="collapse"
      @click.prevent="collapseMenu"
    >
      <i :class="link.icon"></i>
      <p>
        {{ link.name }}
        <b class="caret"></b>
      </p>
    </a>

    <collapse-transition>
      <div v-if="$slots.default || this.isMenu" v-show="!collapsed">
        <ul class="nav links__nav">
          <slot></slot>
        </ul>
      </div>
    </collapse-transition>

    <slot
      name="title"
      v-if="children.length === 0 && !$slots.default && link.path"
    >
      <component
        :to="link.path"
        :is="elementType(link, false)"
        :class="{ active: link.active }"
        class="nav-link"
        :target="link.target"
        :href="link.path"
      >
        <span class="sidebar-link-content" @click="linkClick">
          <template v-if="addLink">
            <span class="sidebar-mini-icon">{{ linkPrefix }}</span>
            <span class="sidebar-normal">{{ link.name }}</span>
          </template>
          <template v-else>
            <i :class="link.icon"></i>
            <p>{{ link.name }}</p>
          </template>
        </span>
      </component>
    </slot>
  </li>
</template>
<script>
import { CollapseTransition } from "src/components/Transitions";

export default {
  name: "sidebar-item",
  components: {
    CollapseTransition,
  },
  props: {
    menu: {
      type: Boolean,
      default: false,
    },
    opened: {
      type: Boolean,
      default: false,
    },
    link: {
      type: Object,
      default: () => {
        return {
          name: "",
          path: "",
          children: [],
        };
      },
    },
  },
  provide() {
    return {
      addLink: this.addChild,
      removeLink: this.removeChild,
    };
  },
  inject: {
    addLink: { default: null },
    removeLink: { default: null },
    autoClose: {
      default: true,
    },
  },
  data() {
    return {
      children: [],
      collapsed: !this.opened,
    };
  },
  computed: {
    linkPrefix() {
      if (this.link.name) {
        let words = this.link.name.split(" ");
        return words.map((word) => word.substring(0, 1)).join("");
      } else {
        return '';
      }

    },
    isMenu() {
      return this.children.length > 0 || this.menu === true;
    },
    isActive() {
      if (this.$route && this.$route.path) {
        let matchingRoute = this.children.find((c) =>
          this.$route.path.startsWith(c.link.path)
        );
        if (matchingRoute !== undefined) {
          return true;
        }
      }
      return false;
    },
  },
  methods: {
    addChild(item) {
      this.children.push(item);
      this.children.sort((left, right) => {
        if (!left.$el || !right.$el || left === right) {
          return 0;
        }

        const position = left.$el.compareDocumentPosition(right.$el);
        if (position & Node.DOCUMENT_POSITION_FOLLOWING) {
          return -1;
        }
        if (position & Node.DOCUMENT_POSITION_PRECEDING) {
          return 1;
        }
        return 0;
      });
    },
    removeChild(item) {
      const tabs = this.children;
      const index = tabs.indexOf(item);
      tabs.splice(index, 1);
    },
    elementType(link, isParent = true) {
      if (link.isRoute === false) {
        return isParent ? "li" : "a";
      } else {
        return "router-link";
      }
    },
    linkAbbreviation(name) {
      const matches = name.match(/\b(\w)/g);
      return matches.join("");
    },
    linkClick() {
      if (
        this.autoClose &&
        this.$sidebar &&
        this.$sidebar.showSidebar === true
      ) {
        this.$sidebar.displaySidebar(false);
      }
    },
    collapseMenu() {
      this.collapsed = !this.collapsed;
    },
    collapseSubMenu(link) {
      link.collapsed = !link.collapsed;
    },
    removeFromSidebar() {
      if (this.$el && this.$el.parentNode) {
        this.$el.parentNode.removeChild(this.$el);
      }
      if (this.removeLink) {
        this.removeLink(this);
      }
    },
  },
  mounted() {
    if (this.addLink) {
      this.addLink(this);
    }
    if (this.link.collapsed !== undefined) {
      this.collapsed = this.link.collapsed;
    }
    if (this.isActive && this.isMenu) {
      this.collapsed = false;
    }
  },
  unmounted() {
    this.removeFromSidebar();
  },
};
</script>
<style>
.sidebar-menu-item {
  cursor: pointer;
}
.sidebar ul.links__nav {
  margin-top: 0;
  padding-top: 10px;
}
.sidebar-link-content {
  align-items: center;
  display: flex;
  width: 100%;
}
</style>
